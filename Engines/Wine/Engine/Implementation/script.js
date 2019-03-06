include("utils.functions.filesystem.files");
include("utils.functions.filesystem.extract");
include("utils.functions.net.download");
include("utils.functions.net.resource");

/* exported WINE_PREFIX_DIR */
var WINE_PREFIX_DIR = "wineprefix";

/**
 * Wine engine
*/
var engineImplementation = {
    _configFactory: Bean("compatibleConfigFileFormatFactory"),
    _containerRegex: /[^a-z0-9_\- ]/gi,
    _ExeAnalyser: Bean("exeAnalyser"),
    _ldPath: Bean("propertyReader").getProperty("application.environment.ld"),
    _operatingSystemFetcher: Bean("operatingSystemFetcher"),
    _wineEnginesDirectory: Bean("propertyReader").getProperty("application.user.engines") + "/wine",
    _winePrefixesDirectory: Bean("propertyReader").getProperty("application.user.containers") + "/" + WINE_PREFIX_DIR + "/",
    _wineWebServiceUrl : Bean("propertyReader").getProperty("webservice.wine.url"),
    _wizard: null,
    _workingContainer: "",
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
        if (!this.isInstalled(subCategory, version)) {
            var ownWizard = false;
            var wizard = this.getWizard();
            if (!wizard) {
                wizard = SetupWizard(InstallationType.ENGINES, "Wine " + version + " " + distribution + " (" + architecture + ")", java.util.Optional.empty());
                ownWizard = true;
            }

            print(tr("Installing version: {0}", version));

            var wineJson = JSON.parse(this.getAvailableVersions());

            var that = this;
            wineJson.forEach(function (distribution) {
                if (distribution.name === subCategory) {
                    distribution.packages.forEach(function (winePackage) {
                        if (winePackage.version === version) {
                            that._installWinePackage(wizard, winePackage, localDirectory);
                            that._installGecko(wizard, winePackage, localDirectory);
                            that._installMono(wizard, winePackage, localDirectory);
                        }
                    });
                }
            });

            // FIXME : Not found case!

            if (ownWizard) {
                wizard.close();
            }
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

        var files = ls(localDirectory);
        if (files.length == 1) {
            // probably the archive contained a folder (e.g. for Lutris Wine version)
            // link folders so Phoenicis can find them
            var extractedDir = files[0];

            var forEach = Array.prototype.forEach;
            forEach.call(ls(localDirectory + "/" + extractedDir), function (folder) {
                lns(localDirectory + "/" + extractedDir + "/" + folder, localDirectory + "/" + folder);
            }
            );
        }
    },
    _installGecko: function (setupWizard, winePackage, localDirectory) {
        if (winePackage.geckoUrl) {
            var gecko = new Resource()
                .wizard(setupWizard)
                .url(winePackage.geckoUrl)
                .checksum(winePackage.geckoMd5)
                .algorithm("md5")
                .name(winePackage.geckoFile)
                .directory("gecko")
                .get();

            var wineGeckoDir = localDirectory + "/share/wine/gecko";

            var FileClass = Java.type('java.io.File');
            lns(new FileClass(gecko).getParent(), wineGeckoDir);
        }
    },
    _installMono: function (setupWizard, winePackage, localDirectory) {
        if (winePackage.monoUrl) {
            var mono = new Resource()
                .wizard(setupWizard)
                .url(winePackage.monoUrl)
                .checksum(winePackage.monoMd5)
                .algorithm("md5")
                .name(winePackage.monoFile)
                .directory("mono")
                .get();

            var wineMonoDir = localDirectory + "/share/wine/mono";

            var FileClass = Java.type('java.io.File');
            lns(new FileClass(mono).getParent(), wineMonoDir);
        }
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
    getWorkingContainer: function () {
        return this._workingContainer;
    },
    setWorkingContainer: function (workingContainer) {
        var workingContainerCleaned = workingContainer.replace(this._containerRegex, '');
        this._workingContainer = workingContainerCleaned;
    },
    getContainerDirectory: function (containerName) {
        var containerNameCleaned = containerName.replace(this._containerRegex, '');
        return this._winePrefixesDirectory + "/" + containerNameCleaned + "/";
    },
    createContainer: function (subCategory, version, containerName) {
        var parts = subCategory.split("-");
        var distribution = parts[0];
        var architecture = parts[2];

        var containerNameCleaned = containerName.replace(this._containerRegex, '');
        var containerDirectory = this._winePrefixesDirectory + "/" + containerNameCleaned + "/";

        mkdir(containerDirectory);

        var containerConfiguration = this._configFactory.open(containerDirectory + "/phoenicis.cfg");

        containerConfiguration.writeValue("wineVersion", version);
        containerConfiguration.writeValue("wineDistribution", distribution);
        containerConfiguration.writeValue("wineArchitecture", architecture);
    },
    run: function (executable, args, workingDir, captureOutput, wait, userData) {
        var subCategory = "";
        var version = "";
        var architecture = "";
        var workingContainerDirectory = this.getContainerDirectory(this.getWorkingContainer());
        if (fileExists(workingContainerDirectory)) {
            var containerConfiguration = this._configFactory.open(workingContainerDirectory + "/phoenicis.cfg");
            var distribution = containerConfiguration.readValue("wineDistribution", "upstream");
            architecture = containerConfiguration.readValue("wineArchitecture", "x86");
            var operatingSystem = this._operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
            subCategory = distribution + "-" + operatingSystem + "-" + architecture;
            version = containerConfiguration.readValue("wineVersion");
            this.install(subCategory, version);
        }
        else {
            print("Wine prefix \"" + this.getWorkingContainer() + "\" does not exist!");
            return "";
        }

        if (!args) {
            args = [];
        }

        var extensionFile = executable.split(".").pop();

        if (extensionFile == "msi") {
            var msiArgs = org.apache.commons.lang.ArrayUtils.addAll(["/i", executable], args);
            return this.run("msiexec", msiArgs, workingDir, captureOutput, wait, userData);
        }

        if (extensionFile == "bat") {
            var batArgs = org.apache.commons.lang.ArrayUtils.addAll(["/Unix", executable], args);
            return this.run("start", batArgs, workingDir, captureOutput, wait, userData);
        }

        // do not run 64bit executable in 32bit prefix
        if (extensionFile == "exe") {
            var FileClass = Java.type('java.io.File');
            if (architecture == "x86" && this._ExeAnalyser.is64Bits(new FileClass(executable))) {
                throw tr("Cannot run 64bit executable in a 32bit Wine prefix.");
            }
        }

        this.install(subCategory, version);

        var wineBinary = this.getLocalDirectory(subCategory, version) + "/bin/wine";
        var StringArray = Java.type('java.lang.String[]');
        var command = new StringArray(2 + args.length);
        command[0] = wineBinary;
        command[1] = executable;
        java.lang.System.arraycopy(args, 0, command, 2, args.length);
        var ProcessBuilderClass = Java.type('java.lang.ProcessBuilder');
        var processBuilder = new ProcessBuilderClass(command);

        var FileClass = Java.type('java.io.File');
        if (workingDir) {
            processBuilder.directory(new FileClass(workingDir));
        } else {
            var driveC = workingContainerDirectory + "/drive_c";
            mkdir(driveC);
            processBuilder.directory(new FileClass(driveC));
        }

        var environment = processBuilder.environment();
        // disable winemenubuilder (we manage our own shortcuts)
        environment.put("WINEDLLOVERRIDES", "winemenubuilder.exe=d");
        environment.put("WINEPREFIX", workingContainerDirectory);

        if (userData.wineDebug) {
            environment.put("WINEDEBUG", userData.wineDebug);
        }

        var ldPath = this._ldPath;
        if (userData.ldPath) {
            ldPath = userData.ldPath + ldPath;
        }
        if (architecture == "amd64") {
            ldPath = this.getLocalDirectory(subCategory, version) + "/lib64/:" + ldPath
        } else {
            ldPath = this.getLocalDirectory(subCategory, version) + "/lib/:" + ldPath
        }
        environment.put("LD_LIBRARY_PATH", ldPath);

        if (this._operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage() === "darwin") {
            environment.put("DYLD_FALLBACK_LIBRARY_PATH", ldPath);
            environment.put("FREETYPE_PROPERTIES", "truetype:interpreter-version=35");
        }

        if (!captureOutput) {
            processBuilder.redirectErrorStream(true);
            processBuilder.redirectOutput(new FileClass(workingContainerDirectory + "/wine.log"));
        }

        var process = processBuilder.start();

        if (wait) {
            process.waitFor();
        }

        if (captureOutput) {
            return org.apache.commons.io.IOUtils.toString(process.getInputStream());
        } else {
            return "";
        }
    },
    getWizard: function () {
        return this._wizard;
    },
    setWizard: function (wizard) {
        this._wizard = wizard;
    }
};

/* exported Engine */
var Engine = Java.extend(org.phoenicis.engines.Engine, engineImplementation);
