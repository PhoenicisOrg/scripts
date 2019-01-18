include(["engines", "wine", "engine", "implementation"]);
include(["utils", "functions", "filesystem", "files"]);
include(["utils", "functions", "filesystem", "extract"]);
include(["utils", "functions", "net", "download"]);
include(["utils", "functions", "net", "resource"]);

/* exported LATEST_STABLE_VERSION */
var LATEST_STABLE_VERSION = "3.0.4";
/* exported LATEST_DEVELOPMENT_VERSION */
var LATEST_DEVELOPMENT_VERSION = "4.0-rc6";
/* exported LATEST_STAGING_VERSION */
var LATEST_STAGING_VERSION = "4.0-rc4";
/* exported LATEST_DOS_SUPPORT_VERSION */
var LATEST_DOS_SUPPORT_VERSION = "4.0-rc4";

/**
 * Wine main prototype
 * @constructor
 */
function Wine() {
    this._implementation = new Engine();
    this._OperatingSystemFetcher = Bean("operatingSystemFetcher");
}

/**
*
* @returns {string} architecture ("x86" or "amd64")
*/
Wine.prototype.architecture = function () {
    // get
    if (arguments.length == 0) {
        if (fileExists(this.prefixDirectory())) {
            var configFactory = Bean("compatibleConfigFileFormatFactory");
            var containerConfiguration = configFactory.open(this.prefixDirectory() + "/phoenicis.cfg");
            var architecture = containerConfiguration.readValue("wineArchitecture", "x86");
            return architecture;
        }
        else {
            print("Wine prefix \"" + this.prefixDirectory() + "\" does not exist!");
            return "";
        }
    }
};

/**
*
* @param {SetupWizard} [wizard]
* @returns {SetupWizard|Wine}
*/
Wine.prototype.wizard = function (wizard) {
    // get
    if (arguments.length == 0) {
        return this._implementation.getWizard();
    }

    // set
    this._implementation.setWizard(wizard);
    return this;
};

/**
 * @param {String} [path]
 * @returns {String}
 */
Wine.prototype.winepath = function (path) {
    return this.run("winepath", ["-w", path], this.prefixDirectory(), true, true);
}

/**
*
* @param {string} [prefix]
* @param {string} [distribution]
* @param {string} [architecture]
* @param {string} [version]
* @returns {string|Wine}
*/
Wine.prototype.prefix = function (prefix, distribution, architecture, version) {
    // get
    if (arguments.length == 0) {
        return this._implementation.getWorkingContainer();
    }
    // set
    else if (arguments.length == 1) {
        this._implementation.setWorkingContainer(prefix);
        return this;
    }
    else {
        var operatingSystem = this._OperatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
        var subCategory = distribution + "-" + operatingSystem + "-" + architecture;
        this._implementation.createContainer(subCategory, version, prefix);
        this._implementation.setWorkingContainer(prefix);
        return this;
    }
};

/**
* returns prefix directory
* @returns {string}
*/
Wine.prototype.prefixDirectory = function () {
    return this._implementation.getContainerDirectory(this._implementation.getWorkingContainer());
};

/**
* returns the path to the engine binary directory
* if no parameters are given, the Wine version of the current prefix is used
* @param {string} [subCategory] Wine sub-category
* @param {string} [version] Wine version
* @returns {string} path to "wine" binary
*/
Wine.prototype.binPath = function (subCategory, version) {
    if (0 == arguments.length) {
        if (fileExists(this.prefixDirectory())) {
            var configFactory = Bean("compatibleConfigFileFormatFactory");
            var containerConfiguration = configFactory.open(this.prefixDirectory() + "/phoenicis.cfg");
            var distribution = containerConfiguration.readValue("wineDistribution", "upstream");
            var architecture = containerConfiguration.readValue("wineArchitecture", "x86");
            var operatingSystem = this._OperatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
            subCategory = distribution + "-" + operatingSystem + "-" + architecture;
            version = containerConfiguration.readValue("wineVersion");
        }
        else {
            print("Wine prefix \"" + this.prefixDirectory() + "\" does not exist!");
            return "";
        }
    }
    return this._implementation.getLocalDirectory(subCategory, version) + "/bin/";
};

/**
*
* @param {string} executable
* @param {array} [args = []]
* @param {boolean} [wait=false]
*/
Wine.prototype.runInsidePrefix = function (executable, args, wait) {
    if (!args) {
        args = [];
    } else if (typeof args === 'string' || args instanceof String) {
        args = [args];
    }
    if (!wait) {
        wait = false;
    }
    return this.run(this.prefixDirectory() + "/drive_c/" + executable, args, this.prefixDirectory(), false, wait);
};

/**
*
* @param executable
* @param {array} [args = []]
* @param {string} [workingDirectory = working container]
* @param {boolean} [captureOutput=false]
* @param {boolean} [wait=false]
* @param {map} [userData=empty]
* @returns {String} output
*/
Wine.prototype.run = function (executable, args, workingDirectory, captureOutput, wait, userData) {
    if (!args) {
        args = [];
    } else if (typeof args === 'string' || args instanceof String) {
        args = [args];
    }
    if (!workingDirectory) {
        workingDirectory = this._implementation.getContainerDirectory(this._implementation.getWorkingContainer()) + "/drive_c";
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
* @param {string} name of the application which shall be uninstalled
* @returns {Wine}
*/
Wine.prototype.uninstall = function (application) {
    var list = this.run("uninstaller", ["--list"], this.prefixDirectory(), true, true);
    var appEscaped = application.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    var re = new RegExp("(.*)\\|\\|\\|.*" + appEscaped);
    var uuid = list.match(re);
    if (uuid) {
        this._implementation.getWizard().wait(tr("Please wait while {0} is uninstalled...", application));
        this.run("uninstaller", ["--remove", uuid[1]], this.prefixDirectory(), false, true);
    } else {
        print(tr("Could not uninstall {0}!", application));
    }
    return this;
};

/**
* runs "wineboot"
*/
Wine.prototype.create = function () {
    this.run("wineboot", [], this.prefixDirectory(), false, true);
    return this;
};

/**
*
* @returns {string} name of "Program Files"
*/
Wine.prototype.programFiles = function () {
    var programFilesName = this.run("cmd", ["/c", "echo", "%ProgramFiles%"], this.prefixDirectory(), true, true).trim();
    if (programFilesName == "%ProgramFiles%") {
        return "Program Files"
    } else {
        return org.apache.commons.io.FilenameUtils.getBaseName(programFilesName);
    }
};

/**
* executes wineserver in current prefix
* @param {string} wineserver parameter
*/
Wine.prototype.wineServer = function (parameter) {
    var workingContainerDirectory = this._implementation.getContainerDirectory(this._implementation.getWorkingContainer());
    if (fileExists(workingContainerDirectory)) {
        var configFactory = Bean("compatibleConfigFileFormatFactory");
        var containerConfiguration = configFactory.open(workingContainerDirectory + "/phoenicis.cfg");
        var distribution = containerConfiguration.readValue("wineDistribution", "upstream");
        var architecture = containerConfiguration.readValue("wineArchitecture", "x86");
        var operatingSystem = this._OperatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
        var subCategory = distribution + "-" + operatingSystem + "-" + architecture;
        var version = containerConfiguration.readValue("wineVersion");
        var binary = this._implementation.getLocalDirectory(subCategory, version) + "/bin/wineserver";
        var processBuilder = new java.lang.ProcessBuilder(Java.to([binary, parameter], "java.lang.String[]"));
        var environment = processBuilder.environment();
        environment.put("WINEPREFIX", this._implementation.getContainerDirectory(this._implementation.getWorkingContainer()));
        processBuilder.inheritIO();
        var wineServerProcess = processBuilder.start();
        wineServerProcess.waitFor();
    }
    else {
        print("Wine prefix \"" + this.getWorkingContainer() + "\" does not exist!");
    }
};

/**
* wait until wineserver finishes
* @returns {Wine}
*/
Wine.prototype.wait = function () {
    this.wineServer("-w");
    return this;
};

/**
* kill wine server
* @returns {Wine}
*/
Wine.prototype.kill = function () {
    this.wineServer("-k");
    return this;
};

/**
*
* @param {string} [architecture = current architecture]
* @returns {string[]}
*/
Wine.prototype.availableDistributions = function (architectureName) {
    var distributions = [];
    var wineJson = JSON.parse(this._implementation.getAvailableVersions());
    var architecture = architectureName || this._architecture;
    var architectureRegExp = new RegExp(architecture);
    wineJson.forEach(function (distribution) {
        // only with the right architecture
        if (architectureRegExp.test(distribution.name)) {
            distributions.push(distribution.name.match(/([a-z]+)-/)[1]);
        }
    });
    distributions.sort();
    return distributions;
}

/**
*
* @param {string} [distribution name = current distribution]
* @returns {string[]}
*/
Wine.prototype.availableVersions = function (distributionName) {
    var versions = [];
    var fullDistributionName = distributionName || this._fetchFullDistributionName();
    var wineJson = JSON.parse(this._implementation.getAvailableVersions());
    wineJson.forEach(function (distribution) {
        if (distribution.name == fullDistributionName) {
            distribution.packages.forEach(function (winePackage) {
                versions.push(winePackage.version);
            });
        }
    });
    versions.sort();
    versions.reverse();
    return versions;
}

/**
*
* @returns {string} system32 directory
*/
Wine.prototype.system32directory = function () {
    if (fileExists(this.prefixDirectory() + "/drive_c/windows/syswow64")) {
        return this.prefixDirectory() + "/drive_c/windows/syswow64";
    } else {
        return this.prefixDirectory() + "/drive_c/windows/system32";
    }
};

/**
*
* @returns {string} system64 directory
*/
Wine.prototype.system64directory = function () {
    if (fileExists(this.prefixDirectory() + "/drive_c/windows/syswow64")) {
        return this.prefixDirectory() + "/drive_c/windows/system32";
    }
    throw tr("Prefix seems to be 32bits");
};

/**
*
* @returns {string} font directory
*/
Wine.prototype.fontDirectory = function () {
    return this.prefixDirectory() + "/drive_c/windows/Fonts";
};
