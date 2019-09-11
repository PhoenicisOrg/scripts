const {ls, mkdir, fileExists, cat, lns, remove, touch, createTempFile} = include("utils.functions.filesystem.files");
const {Extractor} = include("utils.functions.filesystem.extract");
const Downloader = include("utils.functions.net.download");
const Resource = include("utils.functions.net.resource");
const {WINE_PREFIX_DIR} = include("engines.wine.engine.constants");

const configFactory = Bean("compatibleConfigFileFormatFactory");
const exeAnalyser = Bean("exeAnalyser");
const propertyReader = Bean("propertyReader")
const operatingSystemFetcher = Bean("operatingSystemFetcher");

const FileClass = Java.type("java.io.File");
const ProcessBuilderClass = Java.type("java.lang.ProcessBuilder");
const IOUtils = Java.type("org.apache.commons.io.IOUtils");
const Optional = Java.type("java.util.Optional");

/**
 * Wine engine
 */
module.default = class WineEngine {
    constructor() {
        this._containerRegex = /[^a-z0-9_\- ]/gi;
        this._ldPath = propertyReader.getProperty("application.environment.ld");
        this._wineEnginesDirectory = propertyReader.getProperty("application.user.engines") + "/wine";
        this._winePrefixesDirectory = propertyReader.getProperty("application.user.containers") + "/" + WINE_PREFIX_DIR + "/";
        this._wineWebServiceUrl = propertyReader.getProperty("webservice.wine.url");
        this._wizard = null;
        this._workingContainer = "";
        this._fetchedRuntimeJson = false;
    }

    getLocalDirectory(subCategory, version) {
        const [distribution, , architecture] = subCategory.split("-");
        const operatingSystem = operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();

        const fullDistributionName = distribution + "-" + operatingSystem + "-" + architecture;

        return this._wineEnginesDirectory + "/" + fullDistributionName + "/" + version;
    }

    isInstalled(subCategory, version) {
        return fileExists(this.getLocalDirectory(subCategory, version));
    }

    install(subCategory, version) {
        this._installRuntime(this.getWizard());

        const [distribution, , architecture] = subCategory.split("-");
        const localDirectory = this.getLocalDirectory(subCategory, version);

        // if not installed
        if (!this.isInstalled(subCategory, version)) {
            let ownWizard = false;
            let wizard = this.getWizard();
            if (!wizard) {
                const wizardTitle = `Wine ${version} ${distribution} (${architecture})`;

                wizard = SetupWizard(InstallationType.ENGINES, wizardTitle, Optional.empty());
                ownWizard = true;
            }

            print(tr("Installing version: {0}", version));

            const wineJson = JSON.parse(this.getAvailableVersions());

            wineJson
                .filter(distribution => distribution.name === subCategory)
                .flatMap(distribution => distribution.packages)
                .forEach(winePackage => {
                    if (winePackage.version === version) {
                        this._installWinePackage(wizard, winePackage, localDirectory);
                        this._installGecko(wizard, winePackage, localDirectory);
                        this._installMono(wizard, winePackage, localDirectory);
                    }
                });

            // FIXME : Not found case!

            if (ownWizard) {
                wizard.close();
            }
        }
    }

    _installWinePackage(setupWizard, winePackage, localDirectory) {
        const tmpFile = createTempFile("tar.gz");

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

        const files = ls(localDirectory);
        if (files.length == 1) {
            // probably the archive contained a folder (e.g. for Lutris Wine version)
            // link folders so Phoenicis can find them
            const [extractedDir] = files;

            ls(localDirectory + "/" + extractedDir).forEach(folder =>
                lns(localDirectory + "/" + extractedDir + "/" + folder, localDirectory + "/" + folder)
            );
        }
    }
    _installRuntime(setupWizard) {
        // avoid that runtime is installed multiple times during one installation
        if (this._fetchedRuntimeJson) {
            return;
        }

        const runtimeJsonPath = this._wineEnginesDirectory + "/runtime.json";
        let runtimeJson;
        let runtimeJsonFile;
        let downloadx86 = false;
        let downloadx64 = false;
        let namex86;
        let namex64;
        if (!fileExists(runtimeJsonPath)) {
            mkdir(this._wineEnginesDirectory + "/runtime");

            runtimeJsonFile = new Downloader()
                .wizard(this._wizard)
                .message(tr("Downloading runtime json..."))
                .url("https://phoenicis.playonlinux.com/index.php/runtime?os=linux")
                .to(runtimeJsonPath)
                .get();

            runtimeJson = JSON.parse(cat(runtimeJsonFile));
            downloadx86 = true;
            downloadx64 = true;

            let maxVersionx86 = 0;
            let maxVersionx64 = 0;
            runtimeJson.forEach(archive => {
                if (archive.arch === "amd64") {
                    if (archive.name > maxVersionx64) {
                        maxVersionx64 = archive.name;
                    }
                } else if (archive.arch === "x86") {
                    if (archive.name > maxVersionx86) {
                        maxVersionx86 = archive.name;
                    }
                }
            });

            namex86 = maxVersionx86;
            namex64 = maxVersionx64;
        } else {
            const oldRuntimeJsonFile = cat(this._wineEnginesDirectory + "/runtime.json");
            const oldRuntimeJson = JSON.parse(oldRuntimeJsonFile);

            runtimeJsonFile = new Downloader()
                .wizard(this._wizard)
                .message(tr("Downloading runtime json..."))
                .url("https://phoenicis.playonlinux.com/index.php/runtime?os=linux")
                .to(runtimeJsonPath)
                .get();

            runtimeJson = JSON.parse(cat(runtimeJsonFile));

            let maxVersion2x86 = 0;
            let maxVersion2x64 = 0;

            runtimeJson.forEach(archive => {
                if (archive.arch === "amd64") {
                    if (archive.name > maxVersion2x64) {
                        maxVersion2x64 = archive.name;
                    }
                } else if (archive.arch === "x86") {
                    if (archive.name > maxVersion2x86) {
                        maxVersion2x86 = archive.name;
                    }
                }
            });

            let oldMaxVersionx86 = 0;
            let oldMaxVersionx64 = 0;

            oldRuntimeJson.forEach(archive => {
                if (archive.arch === "amd64") {
                    if (archive.name > oldMaxVersionx64) {
                        oldMaxVersionx64 = archive.name;
                    }
                } else if (archive.arch === "x86") {
                    if (archive.name > oldMaxVersionx86) {
                        oldMaxVersionx86 = archive.name;
                    }
                }
            });

            if (maxVersion2x86 > oldMaxVersionx86) {
                namex86 = maxVersion2x86;
                downloadx86 = true;
            }
            if (maxVersion2x64 > oldMaxVersionx64) {
                namex64 = maxVersion2x64;
                downloadx64 = true;
            }
        }

        if (downloadx64 === true) {
            if (fileExists(this._wineEnginesDirectory + "/runtime/lib64")) {
                remove(this._wineEnginesDirectory + "/runtime/lib64");
            }

            mkdir(this._wineEnginesDirectory + "/TMP");

            runtimeJson.forEach(archive => {
                if (archive.name === namex64 && archive.arch === "amd64") {
                    const runtime = new Downloader()
                        .wizard(setupWizard)
                        .url(archive.url)
                        .message(tr("Downloading amd64 runtime..."))
                        .checksum(archive.sha1sum)
                        .to(
                            this._wineEnginesDirectory +
                                "/TMP/" +
                                archive.url.substring(archive.url.lastIndexOf("/") + 1)
                        )
                        .get();

                    new Extractor()
                        .wizard(setupWizard)
                        .archive(runtime)
                        .to(this._wineEnginesDirectory + "/runtime")
                        .extract();
                }
            });

            remove(this._wineEnginesDirectory + "/TMP");
        }
        if (downloadx86 === true) {
            if (fileExists(this._wineEnginesDirectory + "/runtime/lib")) {
                remove(this._wineEnginesDirectory + "/runtime/lib");
            }

            mkdir(this._wineEnginesDirectory + "/TMP");

            runtimeJson.forEach(archive => {
                if (archive.name === namex86 && archive.arch === "x86") {
                    const runtime = new Downloader()
                        .wizard(setupWizard)
                        .url(archive.url)
                        .message(tr("Downloading x86 runtime..."))
                        .checksum(archive.sha1sum)
                        .to(
                            this._wineEnginesDirectory +
                                "/TMP/" +
                                archive.url.substring(archive.url.lastIndexOf("/") + 1)
                        )
                        .get();

                    new Extractor()
                        .wizard(setupWizard)
                        .archive(runtime)
                        .to(this._wineEnginesDirectory + "/runtime")
                        .extract();
                }
            });

            remove(this._wineEnginesDirectory + "/TMP");
        }

        this._fetchedRuntimeJson = true;
    }

    _installGecko(setupWizard, winePackage, localDirectory) {
        if (winePackage.geckoUrl) {
            const gecko = new Resource()
                .wizard(setupWizard)
                .url(winePackage.geckoUrl)
                .checksum(winePackage.geckoMd5)
                .algorithm("md5")
                .name(winePackage.geckoFile)
                .directory("gecko")
                .get();

            const wineGeckoDir = localDirectory + "/share/wine/gecko";

            lns(new FileClass(gecko).getParent(), wineGeckoDir);
        }
    }

    _installMono(setupWizard, winePackage, localDirectory) {
        if (winePackage.monoUrl) {
            const mono = new Resource()
                .wizard(setupWizard)
                .url(winePackage.monoUrl)
                .checksum(winePackage.monoMd5)
                .algorithm("md5")
                .name(winePackage.monoFile)
                .directory("mono")
                .get();

            const wineMonoDir = localDirectory + "/share/wine/mono";

            lns(new FileClass(mono).getParent(), wineMonoDir);
        }
    }

    delete(subCategory, version) {
        if (this.isInstalled(subCategory, version)) {
            remove(this.getLocalDirectory(subCategory, version));
        }
    }

    getAvailableVersions() {
        const versionsFile = this._wineEnginesDirectory + "/availableVersions.json";

        touch(versionsFile);

        new Downloader()
            .wizard(this._wizard)
            .message(tr("Fetching available Wine versions..."))
            .url(this._wineWebServiceUrl)
            .to(versionsFile)
            .onlyIfUpdateAvailable(true)
            .get();

        return cat(versionsFile);
    }

    getWorkingContainer() {
        return this._workingContainer;
    }

    setWorkingContainer(workingContainer) {
        const workingContainerCleaned = workingContainer.replace(this._containerRegex, "");

        this._workingContainer = workingContainerCleaned;
    }

    getContainerDirectory(containerName) {
        const containerNameCleaned = containerName.replace(this._containerRegex, "");

        return this._winePrefixesDirectory + "/" + containerNameCleaned + "/";
    }

    createContainer(subCategory, version, containerName) {
        const [distribution, , architecture] = subCategory.split("-");

        const containerNameCleaned = containerName.replace(this._containerRegex, "");
        const containerDirectory = this._winePrefixesDirectory + "/" + containerNameCleaned + "/";

        mkdir(containerDirectory);

        const containerConfiguration = configFactory.open(containerDirectory + "/phoenicis.cfg");

        containerConfiguration.writeValue("wineVersion", version);
        containerConfiguration.writeValue("wineDistribution", distribution);
        containerConfiguration.writeValue("wineArchitecture", architecture);
    }

    run(executable, args, workingDir, captureOutput, wait, userData) {
        let subCategory = "";
        let version = "";
        let architecture = "";
        let workingContainerDirectory = this.getContainerDirectory(this.getWorkingContainer());
        let distribution = "";

        if (fileExists(workingContainerDirectory)) {
            const containerConfiguration = configFactory.open(workingContainerDirectory + "/phoenicis.cfg");

            distribution = containerConfiguration.readValue("wineDistribution", "upstream");
            architecture = containerConfiguration.readValue("wineArchitecture", "x86");

            const operatingSystem = operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();

            subCategory = distribution + "-" + operatingSystem + "-" + architecture;
            version = containerConfiguration.readValue("wineVersion");

            this.install(subCategory, version);
        } else {
            print('Wine prefix "' + this.getWorkingContainer() + '" does not exist!');

            return "";
        }

        if (!args) {
            args = [];
        }

        const extensionFile = executable.split(".").pop();

        if (extensionFile == "msi") {
            const msiArgs = ["/i", executable].concat(args);
            return this.run("msiexec", msiArgs, workingDir, captureOutput, wait, userData);
        }

        if (extensionFile == "bat") {
            const batArgs = ["/Unix", executable].concat(args);
            return this.run("start", batArgs, workingDir, captureOutput, wait, userData);
        }

        if (userData["trustLevel"] == "0x20000" && distribution == "staging") {
            const runAsArgs = ["/trustlevel:0x20000", executable].concat(args);
            userData["trustLevel"] = "0"; //avoid infinite loop
            return this.run("runas", runAsArgs, workingDir, captureOutput, wait, userData);
        }

        // do not run 64bit executable in 32bit prefix
        if (extensionFile == "exe") {
            if (architecture == "x86" && exeAnalyser.is64Bits(new FileClass(executable))) {
                throw tr("Cannot run 64bit executable in a 32bit Wine prefix.");
            }
        }

        this.install(subCategory, version);

        const wineBinary = this.getLocalDirectory(subCategory, version) + "/bin/wine";
        const command = [wineBinary, executable].concat(args);
        const processBuilder = new ProcessBuilderClass(Java.to(command, Java.type("java.lang.String[]")));

        if (workingDir) {
            processBuilder.directory(new FileClass(workingDir));
        } else {
            const driveC = workingContainerDirectory + "/drive_c";

            mkdir(driveC);

            processBuilder.directory(new FileClass(driveC));
        }

        var environment = processBuilder.environment();
        // disable winemenubuilder (we manage our own shortcuts)
        environment.put("WINEDLLOVERRIDES", "winemenubuilder.exe=d");
        environment.put("WINEPREFIX", workingContainerDirectory);

        if (userData.environment) {
            Object.keys(userData.environment).forEach(key => {
                environment.put(key, userData.environment[key]);
            });
        }

        let ldPath = this._ldPath;
        if (userData.ldPath) {
            ldPath = userData.ldPath + ldPath;
        }

        if (architecture == "amd64") {
            ldPath =
                this._wineEnginesDirectory +
                "/runtime/lib64/:" +
                this._wineEnginesDirectory +
                "/runtime/lib/:" +
                this.getLocalDirectory(subCategory, version) +
                "/lib64/:" +
                this.getLocalDirectory(subCategory, version) +
                "/lib/:" +
                ldPath;
        } else {
            ldPath =
                this._wineEnginesDirectory +
                "/runtime/lib/:" +
                this.getLocalDirectory(subCategory, version) +
                "/lib/:" +
                ldPath;
        }
        environment.put("LD_LIBRARY_PATH", ldPath);

        if (operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage() === "darwin") {
            environment.put("DYLD_FALLBACK_LIBRARY_PATH", ldPath);
            environment.put("FREETYPE_PROPERTIES", "truetype:interpreter-version=35");
        }

        if (!captureOutput) {
            processBuilder.redirectErrorStream(true);
            processBuilder.redirectOutput(new FileClass(workingContainerDirectory + "/wine.log"));
        }

        const process = processBuilder.start();

        if (wait) {
            process.waitFor();
        }

        if (captureOutput) {
            return IOUtils.toString(process.getInputStream());
        } else {
            return "";
        }
    }

    changeVersion(containerName) {
        const wizardTitle = tr("Change {0} container Wine version", containerName);
        const wizard = SetupWizard(InstallationType.ENGINES, wizardTitle, Optional.empty());

        this._wizard = wizard;

        const containerNameCleaned = containerName.replace(this._containerRegex, "");
        const containerDirectory = this._winePrefixesDirectory + "/" + containerNameCleaned + "/";
        const containerConfiguration = configFactory.open(containerDirectory + "/phoenicis.cfg");

        const architecture = containerConfiguration.readValue("wineArchitecture", "x86");
        const operatingSystem = operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();

        const wineJson = JSON.parse(this.getAvailableVersions());

        const distributions = [];
        const versions = [];
        wineJson.forEach(subPart => {
            const [extractedDistribution, , extractedArchitecture] = subPart.name.split("-");
            if (extractedArchitecture == architecture) {
                // extract the distribution
                distributions.push(extractedDistribution);

                // extract the versions of the distribution
                const extractedVersions = subPart.packages.map(winePackage => winePackage.version);
                versions.push(extractedVersions);
            }
        });

        const selectedDistribution = wizard.menu(tr("Please select the distribution of wine."), distributions);
        const selectedVersion = wizard.menu(
            tr("Please select the version of wine."),
            versions[distributions.indexOf(selectedDistribution.text)].sort()
        );

        const subCategory = selectedDistribution.text + "-" + operatingSystem + "-" + architecture;

        this.install(subCategory, selectedVersion.text);

        containerConfiguration.writeValue("wineVersion", selectedVersion.text);
        containerConfiguration.writeValue("wineDistribution", selectedDistribution.text);
        containerConfiguration.writeValue("wineArchitecture", architecture);

        wizard.close();
    }

    getWizard() {
        return this._wizard;
    }

    setWizard(wizard) {
        this._wizard = wizard;
    }
}
