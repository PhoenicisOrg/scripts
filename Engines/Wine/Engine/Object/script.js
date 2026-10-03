const WineEngine = include("engines.wine.engine.implementation");
const { fileExists} = include("utils.functions.filesystem.files");

const configFactory = Bean("compatibleConfigFileFormatFactory");
const operatingSystemFetcher = Bean("operatingSystemFetcher");

const FilenameUtils = Java.type("org.apache.commons.io.FilenameUtils");
const ProcessBuilderClass = Java.type("java.lang.ProcessBuilder");

/**
 * Wine main prototype
 */
// eslint-disable-next-line no-unused-vars
module.default = class Wine {
    constructor() {
                 this._implementation = new WineEngine();
    }

    /**
     *
     * @returns {string} architecture ("x86" or "amd64")
     */
    architecture() {
        if (fileExists(this.prefixDirectory())) {
            //const containerConfiguration = configFactory.open(this.prefixDirectory() + "/phoenicis.cfg");
            const architecture = containerConfiguration.readValue("wineArchitecture", "x86");

            return architecture;
        } else {
            throw new Error(`Wine prefix "${this.prefixDirectory()}" does not exist!`);
        }
    }

    /**
     *
     * @param {SetupWizard} [wizard] setup wizard
     * @returns {SetupWizard|Wine} if used as getter, setup wizard else Wine object
     */
    wizard(wizard) {
        // get
        if (arguments.length == 0) {
            return this._implementation.getWizard();
        }

        // set
        this._implementation.setWizard(wizard);
        return this;
    }

    /**
     * @param {String} [path] path for "-w" option
     */
    winepath(path) {
        return this.run("winepath", ["-w", path], this.prefixDirectory(), true, true);
    }

    /**
     *
     * @param {string} [prefix] Wine prefix
     * @param {string} [distribution] Wine distribution
     * @param {string} [architecture] Wine architecture
     * @param {string} [version] Wine version
     * @returns {string|Wine} if used as getter, Wine prefix else Wine object
     */
    prefix(prefix, distribution, architecture, version) {
        // get
        if (arguments.length == 0) {
            return this._implementation.getWorkingContainer();
        }

        // set
        else if (arguments.length == 1) {
            this._implementation.setWorkingContainer(prefix);
        } else {
            const operatingSystem = operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
            const subCategory = distribution + "-" + operatingSystem + "-" + architecture;

            this._implementation.createContainer(subCategory, version, prefix);
            this._implementation.setWorkingContainer(prefix);
        }

        return this;
    }

    /**
     * returns prefix directory
     * @returns {string} Wine prefix directory
     */
    prefixDirectory() {
        return this._implementation.getContainerDirectory(this._implementation.getWorkingContainer());
    }

    /**
     * returns the path to the engine binary directory
     * if no parameters are given, the Wine version of the current prefix is used
     * @param {string} [subCategory] Wine sub-category
     * @param {string} [version] Wine version
     * @returns {string} path to "wine" binary
     */
    binPath(subCategory, version) {
        if (0 == arguments.length) {
            if (fileExists(this.prefixDirectory())) {
                const containerConfiguration = configFactory.open(this.prefixDirectory() + "/phoenicis.cfg");

                const distribution = containerConfiguration.readValue("wineDistribution", "upstream");
                const architecture = containerConfiguration.readValue("wineArchitecture", "x86");

                const operatingSystem = operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();

                subCategory = distribution + "-" + operatingSystem + "-" + architecture;
                version = containerConfiguration.readValue("wineVersion");
            } else {
                throw new Error(`Wine prefix "${this.prefixDirectory()}" does not exist!`);
            }
        }

        return this._implementation.getLocalDirectory(subCategory, version) + "/bin/";
    }

    /**
     *
     * @param {string} executable path of the executable
     * @param {array} [args = []] command line arguments
     * @param {boolean} [wait=false] true, if method shall wait until execution has finished
     * @returns {string} output
     */
    runInsidePrefix(executable, args, wait) {
        if (!args) {
            args = [];
        } else if (typeof args === "string" || args instanceof String) {
            args = [args];
        }

        if (!wait) {
            wait = false;
        }

        return this.run(this.prefixDirectory() + "/drive_c/" + executable, args, this.prefixDirectory(), false, wait);
    }

    /**
     *
     * @param {string} executable path of the executable
     * @param {array} [args = []] command line arguments
     * @param {string} [workingDirectory = working container] working directory
     * @param {boolean} [captureOutput=false] whether or not the output of the executable shall be captured
     * @param {boolean} [wait=false] true, if method shall wait until execution has finished
     * @param {map} [userData=empty] user data
     * @returns {string} output
     */
    run(executable, args, workingDirectory, captureOutput, wait, userData) {
        if (!args) {
            args = [];
        } else if (typeof args === "string" || args instanceof String) {
            args = [args];
        }
        if (!workingDirectory) {
            workingDirectory =
                this._implementation.getContainerDirectory(this._implementation.getWorkingContainer()) + "/drive_c";
        }
        if (!captureOutput) {
            captureOutput = false;
        }
        if (!wait) {
            wait = false;
        }
        if (!userData) {
            userData = [];
        }

        return this._implementation.run(executable, args, workingDirectory, captureOutput, wait, userData);
    }

    /**
     * uninstall application
     * @param {string} application name of the application which shall be uninstalled
     * @returns {bool} true if an application has been uninstalled, false otherwise
     */
    uninstall(application) {
        const list = this.run("uninstaller", ["--list"], this.prefixDirectory(), true, true);
        const appEscaped = application.replace(/[-[\]/{}()*+?.^$|]/g, "\\$&");
        const re = new RegExp("(.*)\\|\\|\\|.*" + appEscaped);
        const uuid = list.match(re);
        if (uuid) {
            this._implementation.getWizard().wait(tr("Please wait while {0} is uninstalled...", application));
            this.run("uninstaller", ["--remove", uuid[1]], this.prefixDirectory(), false, true);

            return true;
        } else {
            print(tr("Could not uninstall {0}!", application));

            return false;
        }
    }

    /**
     * runs "wineboot"
     *
     * @returns {Wine} Wine object
     */
    create() {
        this.run("wineboot", [], this.prefixDirectory(), false, true);

        return this;
    }

    /**
     *
     * @returns {string} name of "Program Files"
     */
    programFiles() {
        const programFilesName = this.run(
            "cmd",
            ["/c", "echo", "%ProgramFiles%"],
            this.prefixDirectory(),
            true,
            true
        ).trim();

        if (programFilesName == "%ProgramFiles%") {
            return "Program Files";
        } else {
            return FilenameUtils.getBaseName(programFilesName);
        }
    }

    /**
     * executes wineserver in current prefix
     * @param {string} parameter parameters
     * @returns {void}
     */
    wineServer(parameter) {
        const workingContainerDirectory = this.prefixDirectory();

        if (fileExists(workingContainerDirectory)) {
            const containerConfiguration = configFactory.open(workingContainerDirectory + "/phoenicis.cfg");

            const distribution = containerConfiguration.readValue("wineDistribution", "upstream");
            const architecture = containerConfiguration.readValue("wineArchitecture", "x86");
            const version = containerConfiguration.readValue("wineVersion");

            const operatingSystem = operatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();

            const subCategory = distribution + "-" + operatingSystem + "-" + architecture;

            const binary = this._implementation.getLocalDirectory(subCategory, version) + "/bin/wineserver";

            const processBuilder = new ProcessBuilderClass()
                .command(Java.to([binary, parameter], "java.lang.String[]"))
                .inheritIO();

            const environment = processBuilder.environment();
            environment.put(
                "WINEPREFIX",
                this._implementation.getContainerDirectory(this._implementation.getWorkingContainer())
            );

            const wineServerProcess = processBuilder.start();
            wineServerProcess.waitFor();
        } else {
            throw new Error('Wine prefix "' + this.getWorkingContainer() + '" does not exist!');
        }
    }

    /**
     * wait until wineserver finishes
     * @returns {Wine} Wine object
     */
    wait() {
        this.wineServer("-w");

        return this;
    }

    /**
     * kill wine server
     * @returns {Wine} Wine object
     */
    kill() {
        this.wineServer("-k");

        return this;
    }

    /**
     *
     * @param {string} [architectureName = current architecture] Wine architecture
     * @returns {string[]} available versions
     */
    availableDistributions(architectureName) {
        const architecture = architectureName || this._architecture;
        const architectureRegExp = new RegExp(architecture);

        const wineJson = JSON.parse(this._implementation.getAvailableVersions());
        // find all distributions with the right architecture
        return wineJson
            .filter(distribution => architectureRegExp.test(distribution.name))
            .map(distribution => distribution.name.match(/([a-z]+)-/)[1])
            .sort();
    }

    /**
     *
     * @param {string} [distributionName = current distribution] name of the Wine distribution
     * @returns {string[]} available versions
     */
    availableVersions(distributionName) {
        const fullDistributionName = distributionName || this._fetchFullDistributionName();

        const wineJson = JSON.parse(this._implementation.getAvailableVersions());

        return wineJson
            .filter(distribution => distribution.name == fullDistributionName)
            .flatMap(distribution => distribution.packages)
            .map(winePackage => winePackage.version)
            .sort()
            .reverse();
    }

    /**
     *
     * @returns {string} system32 directory
     */
    system32directory() {
        if (fileExists(this.prefixDirectory() + "/drive_c/windows/syswow64")) {
            return this.prefixDirectory() + "/drive_c/windows/syswow64";
        } else {
            return this.prefixDirectory() + "/drive_c/windows/system32";
        }
    }

    /**
     *
     * @returns {string} system64 directory
     */
    system64directory() {
        if (fileExists(this.prefixDirectory() + "/drive_c/windows/syswow64")) {
            return this.prefixDirectory() + "/drive_c/windows/system32";
        }

        throw new Error(tr("Prefix seems to be 32bits"));
    }

    /**
     *
     * @returns {string} font directory
     */
    fontDirectory() {
        return this.prefixDirectory() + "/drive_c/windows/Fonts";
    }
}
