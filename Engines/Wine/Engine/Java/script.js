include(["utils", "functions", "filesystem", "files"]);
include(["utils", "functions", "filesystem", "extract"]);
include(["utils", "functions", "net", "download"]);
include(["utils", "functions", "net", "resource"]);

WINE_PREFIX_DIR = "wineprefix"

/**
 * Wine engine
*/
var engineImplementation = {
    _configFactory: Bean("compatibleConfigFileFormatFactory"),
    _ExeAnalyser: Bean("exeAnalyser"),
    _operatingSystemFetcher: Bean("operatingSystemFetcher"),
    _wineEnginesDirectory: Bean("propertyReader").getProperty("application.user.engines") + "/wine",
    _winePrefixesDirectory: Bean("propertyReader").getProperty("application.user.containers") + "/" + WINE_PREFIX_DIR + "/",
    _wineWebServiceUrl : Bean("propertyReader").getProperty("webservice.wine.url"),
    getLocalDirectory: function (subCategory, version) {
        var parts = subCategory.split("-");
        var distribution = parts[0];
        var architecture = parts[2];
        var operatingSystem = this._operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
        var fullDistributionName = distribution + "-" + operatingSystem + "-" + architecture;
        return this._wineEnginesDirectory + "/" + fullDistributionName + "/" + version;
    },
    isInstalled: function (subCategory, version) {
        return fileExists(this.getLocalDirectory(subCategory, version));
    },
    install: function (subCategory, version) {
        var parts = subCategory.split("-");
        var distribution = parts[0];
        var architecture = parts[2];
        var localDirectory = this.getLocalDirectory(subCategory, version);
        // if not installed
        if (!fileExists(localDirectory)) {
            var wizard = SetupWizard(InstallationType.ENGINES, "Wine " + version + " " + distribution + " (" + architecture + ")", java.util.Optional.empty());
            var operatingSystem = this._operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
            var fullDistributionName =  distribution + "-" + operatingSystem + "-" + architecture;

            if (!this.isInstalled(subCategory, version)) {
                print(tr("Installing version: ", version));

                var wineJson = JSON.parse(this.getAvailableVersions());

                var that = this;
                wineJson.forEach(function (distribution) {
                    if (distribution.name == fullDistributionName) {
                        distribution.packages.forEach(function (winePackage) {
                            if (winePackage.version == version) {
                                that._installWinePackage(wizard, winePackage, localDirectory);
                                that._installGecko(wizard, winePackage, localDirectory);
                                that._installMono(wizard, winePackage, localDirectory);
                            }
                        });
                    }
                });

                // FIXME : Not found case!

            }
            wizard.close();
        }
    },
    _installWinePackage: function (setupWizard, winePackage, localDirectory) {
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
    },
    _installGecko: function (setupWizard, winePackage, localDirectory) {
        var gecko = new Resource()
            .wizard(setupWizard)
            .url(winePackage.geckoUrl)
            .checksum(winePackage.geckoMd5)
            .algorithm("md5")
            .name(winePackage.geckoFile)
            .directory("gecko")
            .get();

        var wineGeckoDir = localDirectory + "/share/wine/gecko";

        lns(new java.io.File(gecko).getParent(), wineGeckoDir);
    },
    _installMono: function (setupWizard, winePackage, localDirectory) {
        var mono = new Resource()
            .wizard(setupWizard)
            .url(winePackage.monoUrl)
            .checksum(winePackage.monoMd5)
            .algorithm("md5")
            .name(winePackage.monoFile)
            .directory("mono")
            .get();

        var wineMonoDir = localDirectory + "/share/wine/mono";

        lns(new java.io.File(mono).getParent(), wineMonoDir);
    },
    delete: function (subCategory, version) {
         if (this.isInstalled(subCategory, version)) {
             remove(this.getLocalDirectory(subCategory, version));
         }
     },
    getAvailableVersions: function () {
        var versionsFile = this._wineEnginesDirectory + "/availableVersions.json";
        touch(versionsFile);
        new Downloader()
            .wizard(this._wizard)
            .url(this._wineWebServiceUrl)
            .to(versionsFile)
            .onlyIfUpdateAvailable(true)
            .get();
        return cat(versionsFile);
    },
    getContainer: function (containerName) {
        var containerNameCleaned = containerName.replace(/[^a-z0-9_\-\ ]/gi, '');
        return containerDirectory = this._winePrefixesDirectory + "/" + containerNameCleaned + "/";
    },
    createContainer: function (subCategory, version, containerName) {
        var parts = subCategory.split("-");
        var distribution = parts[0];
        var architecture = parts[2];

        var containerNameCleaned = containerName.replace(/[^a-z0-9_\-\ ]/gi, '');
        containerDirectory = this._winePrefixesDirectory + "/" + containerNameCleaned + "/";

        mkdir(containerDirectory);

        var containerConfiguration = this._configFactory.open(this.prefixDirectory + "/phoenicis.cfg");

        containerConfiguration.writeValue("wineVersion", version);
        containerConfiguration.writeValue("wineDistribution", distribution);
        containerConfiguration.writeValue("wineArchitecture", architecture);
    },
    run: function (containerName, executable, args, workingDir, captureOutput) {
        var subCategory = "";
        var version = "";
        var architecture = "";
        if (fileExists(this.getContainer(containerName))) {
            var containerConfiguration = this._configFactory.open(this.getContainer(containerName) + "/phoenicis.cfg");
            var distribution = containerConfiguration.readValue("wineDistribution", "upstream");
            architecture = containerConfiguration.readValue("wineArchitecture", "x86");
            var operatingSystem = this._operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
            subCategory = distribution + "-" + operatingSystem + "-" + architecture;
            version = containerConfiguration.readValue("wineVersion");
            this.install(subCategory, version);
        }
        else {
            print("Container " + containerName + " does not exist!");
            return "";
        }

        if (!args) {
            args = [];
        }

        var extensionFile = executable.split(".").pop();

        if (extensionFile == "msi") {
            return this.run("msiexec", ["/i", executable].concat(args), captureOutput);
        }

        if (extensionFile == "bat") {
            return this.run("start", ["/Unix", executable].concat(args), captureOutput);
        }

        // do not run 64bit executable in 32bit prefix
        if (extensionFile == "exe") {
            if (architecture == "x86" && this._ExeAnalyser.is64Bits(new java.io.File(executable))) {
                throw tr("Cannot run 64bit executable in a 32bit Wine prefix.");
            }
        }

        this.install(subCategory, version);

        var wineBinary = this.getLocalDirectory(subCategory, version) + "/bin/wine";
        var processBuilder = new java.lang.ProcessBuilder(Java.to([wineBinary, executable].concat(args), "java.lang.String[]"));

        if (workingDir) {
            processBuilder.directory(new java.io.File(workingDir));
        } else {
            var driveC = this.getContainer(containerName) + "/drive_c";
            mkdir(driveC);
            processBuilder.directory(new java.io.File(driveC));
        }

        var environment = processBuilder.environment();
        // disable winemenubuilder (we manage our own shortcuts)
        environment.put("WINEDLLOVERRIDES", "winemenubuilder.exe=d");
        environment.put("WINEPREFIX", this.getContainer(containerName));

        // TODO
        /*if (this._wineDebug) {
            environment.put("WINEDEBUG", this._wineDebug);
        }*/

        var ldPath = "" // TODO = this._ldPath
        if (architecture == "amd64") {
            ldPath = this.getLocalDirectory(subCategory, version) + "/lib64/:" + ldPath
        } else {
            ldPath = this.getLocalDirectory(subCategory, version) + "/lib/:" + ldPath
        }
        environment.put("LD_LIBRARY_PATH", ldPath);

        if (!captureOutput) {
            processBuilder.redirectErrorStream(true);
            processBuilder.redirectOutput(new java.io.File(this.getContainer(containerName) + "/wine.log"));
        }

        this._process = processBuilder.start();

        if (captureOutput) {
            return org.apache.commons.io.IOUtils.toString(this._process.getInputStream());
        } else {
            return "";
        }
      }
};

/* exported Engine */
var Engine = Java.extend(org.phoenicis.engines.Engine, engineImplementation);
