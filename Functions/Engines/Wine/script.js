include(["Functions", "Filesystem", "Files"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Net", "Download"]);

LATEST_STABLE_VERSION = "1.8.6";

/**
 * Wine main prototype
 * @constructor
 */
var Wine = function () {
    var that = this;
    that._wineWebServiceUrl = Bean("propertyReader").getProperty("webservice.wine.url");
    that._wineEnginesDirectory = Bean("propertyReader").getProperty("application.user.engines.wine");
    that._winePrefixesDirectory = Bean("propertyReader").getProperty("application.user.wineprefix");
    that._configFactory = Bean("compatibleConfigFileFormatFactory");
    that._OperatingSystemFetcher = Bean("operatingSystemFetcher");
    that._wineDebug = "-all";
    that._ldPath = Bean("propertyReader").getProperty("application.environment.ld");

    /**
     *
     * @param wizard
     * @returns {Wine}
     */
    that.wizard = function (wizard) {
        that._wizard = wizard;
        return that;
    };

    /**
     *
     * @param debug
     * @returns {Wine}
     */
    that.debug = function (debug) {
        if(!debug) {
            that._wineDebug = "";
        }
        that._wineDebug = debug;
        return that;
    };

    /**
     *
     * @param architecture
     * @returns {Wine}
     */
    that.architecture = function (architecture) {
        if(that._prefixConfiguration) {
            that._prefixConfiguration.writeValue("wineArchitecture", architecture);
        }

        that._architecture = architecture;
        return that;
    };

    /**
     *
     * @param distribution
     * @returns {Wine}
     */
    that.distribution = function (distribution) {
        if(that._prefixConfiguration) {
            that._prefixConfiguration.writeValue("wineDistribution", distribution);
        }

        that._distribution = distribution;
        return that;
    };

    /**
     *
     * @param prefix
     * @returns {Wine}
     */
    that.prefix = function (prefix) {
        that._prefix = prefix;
        that.prefixDirectory = that._winePrefixesDirectory + "/" + that._prefix + "/";

        mkdir(that.prefixDirectory);

        that._prefixConfiguration = that._configFactory.open(that.prefixDirectory + "/playonlinux.cfg");

        if (!that._version) {
            that._version = that._prefixConfiguration.readValue("wineVersion");
        } else {
            that._prefixConfiguration.writeValue("wineVersion", that._version);
        }

        if (!that._distribution) {
            that._distribution = that._prefixConfiguration.readValue("wineDistribution", "upstream");
        }

        that._prefixConfiguration.writeValue("wineDistribution", that._distribution);

        if (!that._architecture) {
            var defaultArchitecture = Bean("architectureFetcher").fetchCurrentArchitecture().getNameForWinePackages();
            that._architecture = that._prefixConfiguration.readValue("wineArchitecture", defaultArchitecture);
        }

        that._prefixConfiguration.writeValue("wineArchitecture", that._architecture);


        return that;
    };

    /**
     *
     * @param directory
     * @returns {Wine}
     */
    that.workingDirectory = function (directory) {
        that._directory = directory;
        return that;
    };

    /**
     *
     * @param executable
     * @param args
     */
    that.runInsidePrefix = function(executable, args) {
        return that.run(that.prefixDirectory + "/drive_c/" + executable, args);
    };

    /**
     *
     * @param executable
     * @param args
     * @param captureOutput
     * @returns {Wine}
     */
    that.run = function (executable, args, captureOutput) {
        if(!args) {
            args = [];
        }

        that._installVersion();

        var wineBinary = that._fetchLocalDirectory() + "/bin/wine";
        var processBuilder = new java.lang.ProcessBuilder(Java.to([wineBinary, executable].concat(args), "java.lang.String[]"));

        if (that._directory) {
            processBuilder.directory(new java.io.File(that._directory));
        } else {
            var driveC = that.prefixDirectory + "/drive_c";
            mkdir(driveC);
            processBuilder.directory(new java.io.File(driveC));
        }

        if(!captureOutput) {
            processBuilder.inheritIO();
        }

        var environment = processBuilder.environment();
        environment.put("WINEPREFIX", that.prefixDirectory);

        if(that._wineDebug) {
            environment.put("WINEDEBUG", that._wineDebug);
        }

        if(that._ldPath) {
            environment.put("LD_LIBRARY_PATH", that._ldPath);
        }

        that._process = processBuilder.start();

        if(captureOutput) {
            return org.apache.commons.io.IOUtils.toString(that._process.getInputStream());
        } else {
            return that;
        }
    };

    that.create = function() {
        that.run("wineboot");
        return that;
    };

    that.getProgramFiles = function() {
        var programFilesName = that.run("cmd", ["/c", "echo", "%ProgramFiles%"], true).trim();
        if(programFilesName == "%ProgramFiles%") {
            return "Program Files"
        } else {
            return org.apache.commons.io.FilenameUtils.getBaseName(programFilesName);
        }
    };

    /**
     *
     * @returns {Wine}
     */
    that.wait = function () {
        if(that._wizard) {
            that._wizard.wait("Please wait...");
        }

        return that._silentWait();
    };

    /**
     *
     * @returns {Wine}
     */
    that.kill = function() {
        that._wineServer("-k");
        return that;
    };

    /**
     *
     */
    that.getAvailableVersions = function () {
        return new Downloader()
            .wizard(that._wizard)
            .url(that._wineWebServiceUrl)
            .get()
    };

    /**
     *
     * @param version
     * @returns {Wine}
     */
    that.version = function (version) {
        if(that._prefixConfiguration) {
            that._prefixConfiguration.writeValue("wineVersion", version);
        }

        that._version = version;
        return that;
    };

    that._installVersion = function() {
        var version = that._version;
        var fullDistributionName = that._fetchFullDistributionName();
        var localDirectory = that._fetchLocalDirectory();
        var wizard = that._wizard;

        if (!fileExists(localDirectory)) {
            print("Installing version: " + that._version);

            var wineJson = JSON.parse(that.getAvailableVersions());

            wineJson.forEach(function (distribution) {
                if (distribution.name == fullDistributionName) {
                    distribution.packages.forEach(function (winePackage) {
                        if (winePackage.version == version) {
                            that._installWinePackage(wizard, winePackage, localDirectory)
                        }
                    });
                }
            });

            // FIXME : Not found case!

        }
    };


    that._installWinePackage = function (setupWizard, winePackage, localDirectory) {
        var tmpFile = createTempFile("tar.gz");

        new Downloader()
            .wizard(setupWizard)
            .url(winePackage.url)
            .checksum(winePackage.sha1sum)
            .to(tmpFile)
            .get();

        new Extractor()
            .wizard(setupWizard)
            .archive(tmpFile)
            .to(localDirectory)
            .extract();
    };

    that._silentWait = function() {
        if(that._process) {
            that._process.waitFor();
        }
        that._wineServer("-w");
        return that;
    };

    that._fetchFullDistributionName = function () {
        var operatingSystem = that._OperatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
        return that._distribution + "-" + operatingSystem + "-" + that._architecture;
    };

    that._fetchLocalDirectory = function () {
        return that._wineEnginesDirectory + "/" + that._fetchFullDistributionName() + "/" + that._version;
    };

    that._fetchWineServerBinary = function() {
        return that._fetchLocalDirectory() + "/bin/wineserver";
    };

    that._wineServer = function(parameter) {
        var processBuilder = new java.lang.ProcessBuilder(Java.to([that._fetchWineServerBinary(), parameter], "java.lang.String[]"));
        var environment = processBuilder.environment();
        environment.put("WINEPREFIX", that.prefixDirectory);
        processBuilder.inheritIO();
        var wineServerProcess = processBuilder.start();
        wineServerProcess.waitFor();
    };
};

Wine.prototype.regsvr32 = function() {
    var _wine = this;

    this.install = function(dll) {
        _wine.run("regsvr32", ["/i", dll])._silentWait();
        return _wine;
    };

    return this;
};

/**
 * Regedit support
 * @param args
 * @returns {Wine}
 */
Wine.prototype.regedit = function() {
    var _wine = this;

    this.open = function(args) {
        _wine.run("regedit", args)._silentWait();
        return _wine;
    };

    this.patch = function(patchContent) {
        if(patchContent.getClass().getCanonicalName() == "byte[]") {
            patchContent = new java.lang.String(patchContent);
        }
        var tmpFile = createTempFile("reg");
        writeToFile(tmpFile, patchContent);
        _wine.run("regedit", [tmpFile])._silentWait();
        return _wine;
    };

    this.fetchValue = function(keyPath) {
        var root = keyPath[0];
        var registryFile;
        switch(root) {
            case "HKEY_CURRENT_USER":
                registryFile = "user.reg";
                break;
            case "HKEY_LOCAL_MACHINE":
                registryFile = "system.reg";
                break;
            default:
                throw "Illegal registry root exception";
        }

        keyPath.shift();

        var registryValue = Bean("registryParser").parseFile(new java.io.File(this.prefixDirectory + "/" + registryFile), root).getChild(keyPath);

        if(registryValue == null) {
            return null;
        }

        if(registryValue.getText) {
            return registryValue.getText();
        } else {
            return registryValue;
        }
    };

    return this;
};

Wine.prototype.registry = Wine.prototype.regedit;


var OverrideDLL = function() {
    var that = this;
    that._regeditFileContent =
        "REGEDIT4\n" +
        "\n"+
        "[HKEY_CURRENT_USER\\Software\\Wine\\DllOverrides]\n";

    that.wine = function(wine) {
        that._wine = wine;
        return that;
    };

    that.set = function(mode, libraries) {
        libraries.forEach(function(library) {
            that._regeditFileContent += "\"*"+library+"\"=\""+mode+"\"\n";
        });

        return that;
    };

    that.do =  function() {
        that._wine.regedit().patch(that._regeditFileContent);
        return that._wine;
    }
};

Wine.prototype.overrideDLL = function() {
    return new OverrideDLL()
        .wine(this)
};
