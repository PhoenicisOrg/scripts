include(["engines", "wine", "engine", "implementation"]);
include(["utils", "functions", "filesystem", "files"]);
include(["utils", "functions", "filesystem", "extract"]);
include(["utils", "functions", "net", "download"]);
include(["utils", "functions", "net", "resource"]);

var LATEST_STABLE_VERSION = "3.0";
var LATEST_DEVELOPMENT_VERSION = "3.6";
var LATEST_STAGING_VERSION = "2.21";

var WINE_PREFIX_DIR = "wineprefix";


/**
 * Wine main prototype
 * @constructor
 */
function Wine() {
    this._implementation = new Engine();
    this._wineWebServiceUrl = Bean("propertyReader").getProperty("webservice.wine.url");
    this._wineEnginesDirectory = Bean("propertyReader").getProperty("application.user.engines") + "/wine";
    this._winePrefixesDirectory = Bean("propertyReader").getProperty("application.user.containers") + "/" + WINE_PREFIX_DIR + "/";
    this._configFactory = Bean("compatibleConfigFileFormatFactory");
    this._OperatingSystemFetcher = Bean("operatingSystemFetcher");
    this._wineDebug = "-all";
    this._ldPath = Bean("propertyReader").getProperty("application.environment.ld");
}

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
* @param {string} [debug]
* @returns {string|Wine}
*/
Wine.prototype.debug = function (debug) {
    // get
    if (arguments.length == 0) {
        return this._wineDebug;
    }

    // set
    this._wineDebug = debug;
    return this;
};

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
* @returns {String}
*/
Wine.prototype.binPath = function () {
    return this._implementation.getLocalDirectory() + "/bin/";
};

/**
*
* @param executable
* @param args
*/
Wine.prototype.runInsidePrefix = function (executable, args) {
    return this.run(this.prefixDirectory() + "/drive_c/" + executable, args, this.prefixDirectory(), false, false);
};

/**
*
* @param executable
* @param {array} [args = []]
* @param {boolean} [captureOutput=false]
* @returns {String} output
*/
Wine.prototype.run = function (executable, args, workingDirectory, captureOutput, wait) {
    if (!args) {
        args = [];
    }
    if (!workingDirectory) {
        workingDirectory = this._implementation.getContainerDirectory(this._implementation.getWorkingContainer());
    }
    if (!captureOutput) {
        captureOutput = false;
    }
    if (!wait) {
        wait = false;
    }

    return this._implementation.run(executable, args, workingDirectory, captureOutput, wait);
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
        this._implementation.getWizard.wait(tr("Please wait while {0} is uninstalled ...", application));
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
    this.run("wineboot", [], this.prefixDirectory(), false, false);
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
* kill wine server
* @returns {Wine}
*/
Wine.prototype.kill = function () {
    this._wineServer("-k");
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

/**
* runs "regsvr32"
* @returns {Wine}
*/
Wine.prototype.regsvr32 = function () {
    var _wine = this;

    this.install = function (dll) {
        _wine.run("regsvr32", ["/i", dll], this.prefixDirectory(), false, true);
        return _wine;
    };

    return this;
};

/**
 * Regedit support
 * @param args
 * @returns {Wine}
 */
Wine.prototype.regedit = function () {
    var _wine = this;

    this.open = function (args) {
        _wine.run("regedit", [args], this.prefixDirectory(), false, true);
        return _wine;
    };

    this.patch = function (patchContent) {
        if (patchContent.getClass().getCanonicalName() == "byte[]") {
            patchContent = new java.lang.String(patchContent);
        }
        var tmpFile = createTempFile("reg");
        writeToFile(tmpFile, patchContent);
        _wine.run("regedit", [tmpFile], this.prefixDirectory(), false, true);
        return _wine;
    };

    this.fetchValue = function (keyPath) {
        var root = keyPath[0];
        var registryFile;
        switch (root) {
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

        var registryValue = Bean("registryParser").parseFile(new java.io.File(this.prefixDirectory() + "/" + registryFile), root).getChild(keyPath);

        if (registryValue == null) {
            return null;
        }

        if (registryValue.getText) {
            return registryValue.getText();
        } else {
            return registryValue;
        }
    };

    return this;
};

Wine.prototype.registry = Wine.prototype.regedit;

/**
 * sets sound driver
 * @param driver (alsa, pulse)
 * @returns {Wine}
 */
Wine.prototype.setSoundDriver = function (driver) {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Drivers]\n" +
        "\"Audio\"=\"" + driver + "\"\n";
    this.regedit().patch(regeditFileContent);
    return this;
};

/**
 * sets OpenGL max core version
 * @param {number} major
 * @param {number} minor
 * @returns {Wine}
 */
Wine.prototype.setVersionGL = function (major, minor) {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
        "\"MaxVersionGL\"=dword:000"+ major + "000" + minor
    this.regedit().patch(regeditFileContent);
    return this;
};

/**
 * enable command stream multi-threading
 * @returns {Wine}
 */
Wine.prototype.enableCSMT = function () {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
        "\"csmt\"=dword:1"
    this.regedit().patch(regeditFileContent);
    return this;
};

/**
 * force the Use of GLSL
 * @param {string} mode (enabled or disabled)
 * @returns {Wine}
 */
Wine.prototype.UseGLSL = function (mode) {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
        "\"UseGLSL\"=\"" + mode + "\""
    this.regedit().patch(regeditFileContent);
    return this;
};

/**
 * force the DirectDrawRenderer
 * @param {string} mode (gdi or opengl)
 * @returns {Wine}
 */
Wine.prototype.DirectDrawRenderer = function (mode) {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
        "\"DirectDrawRenderer\"=\"" + mode + "\""
    this.regedit().patch(regeditFileContent);
    return this;
};

/**
 * sets Virtual Desktop with window resolution
 * @param {number} width
 * @param {number} height
 * @returns {Wine}
 */

Wine.prototype.setVirtualDesktop = function (width, height) {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Explorer\\Desktops]\n" +
        "\"Default\"=\"" + width + "x" + height + "\"\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Explorer]\n" +
        "\"Desktop\"=\"" + "Default" + "\"\n";
    this.regedit().patch(regeditFileContent);
    return this;
};

/**
*
* @param {boolean} [managed]
* @returns {boolean|Wine}
*/
Wine.prototype.managed = function (managed) {
    // get
    if (arguments.length == 0) {
        return (this.regedit().fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "X11 Driver", "Managed"]) == "Y");
    }

    // set
    var managedYn = managed ? "Y" : "N";

    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\X11 Driver]\n" +
        "\"Managed\"=\"" + managedYn + "\"\n";
    this.regedit().patch(regeditFileContent);
    return this;
};

var SetManagedForApplication = function () {
    var that = this;
    that._regeditFileContent =
        "REGEDIT4\n" +
        "\n";

    that.wine = function (wine) {
        that._wine = wine;
        return that;
    };

    that.set = function (application, managed) {
        var managedYn = managed ? "Y" : "N";

        that._regeditFileContent += "[HKEY_CURRENT_USER\\Software\\Wine\\AppDefaults\\" + application + "\\X11 Driver]\n";
        that._regeditFileContent += "\"Managed\"=\"" + managedYn + "\"\n";

        return that;
    };

    that.do =  function () {
        that._wine.regedit().patch(that._regeditFileContent);
        return that._wine;
    }
};

Wine.prototype.setManagedForApplication = function () {
    return new SetManagedForApplication()
        .wine(this)
};

var OverrideDLL = function () {
    var that = this;
    that._regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\DllOverrides]\n";

    that.wine = function (wine) {
        that._wine = wine;
        return that;
    };

    that.set = function (mode, libraries) {
        libraries.forEach(function (library) {
            // make sure library does not end with ".dll"
            library = library.replace(".dll", "");
            that._regeditFileContent += "\"*" + library + "\"=\"" + mode + "\"\n";
        });

        return that;
    };

    that.do =  function () {
        that._wine.regedit().patch(that._regeditFileContent);
        return that._wine;
    }
};

Wine.prototype.overrideDLL = function () {
    return new OverrideDLL()
        .wine(this)
};

/**
 * default windows version
 * @param {string} [version (win7, vista, win2003, winxp, win2k, winnt, winme, win98, win95, win31)]
 * @returns {string|Wine}
 */
Wine.prototype.windowsVersion = function (version, servicePack) {
    var that = this;
    // get
    if (arguments.length == 0) {
        return this.regedit().fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Version"]);
    }

    // set
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine]\n" +
        "\"Version\"=\"" + version + "\"\n";

    if (servicePack) {
        var servicePackNumber = servicePack.replace("sp", "");
        that._regeditFileContent += "[HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion]";
        that._regeditFileContent += "\"CSDVersion\"=\"Service Pack "+ servicePackNumber +"\"";
        that._regeditFileContent += "[HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\Windows]";
        that._regeditFileContent += "\"CSDVersion\"=dword:00000"+servicePackNumber+"00";
    }

    this.regedit().patch(regeditFileContent);
    return this;
};

/**
 * use native application for a certain file extension
 * @param {string} [file extension (pdf, txt, rtf)]
 * @returns {string|Wine}
 */
Wine.prototype.nativeApplication = function (extension) {
    // FIXME: get
    if (arguments.length == 0) {
        return this.regedit().fetchValue(["HKEY_CLASSES_ROOT", "." + extension]);
    }

    // set
    var mimetype = null;
    switch (extension) {
        case "pdf":
            mimetype = "application/pdf";
            break;
        case "txt":
            mimetype = "application/plain";
            break;
        case "rtf":
            mimetype = "application/rtf";
            break;
        default:
            throw tr("Could not determine mimetype for file extension \"{0}\"", extension);
    }
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CLASSES_ROOT\\." + extension + "]\n" +
        "@=\"" + extension + "file\"\n" +
        "\"Content Type\"=\"" + mimetype + "\"\n" +
        "[HKEY_CLASSES_ROOT\\" + extension + "file\\Shell\\Open\\command]\n" +
        "@=\"winebrowser \"%1\"\"";
    this.regedit().patch(regeditFileContent);
    return this;
};

var SetOsForApplication = function () {
    var that = this;
    that._regeditFileContent =
        "REGEDIT4\n" +
        "\n";

    that.wine = function (wine) {
        that._wine = wine;
        return that;
    };

    that.set = function (application, os) {
        that._regeditFileContent += "[HKEY_CURRENT_USER\\Software\\Wine\\AppDefaults\\" + application + "]\n";
        that._regeditFileContent += "\"Version\"=\"" + os + "\"\n";

        return that;
    };

    that.do =  function () {
        that._wine.regedit().patch(that._regeditFileContent);
        return that._wine;
    }
};

Wine.prototype.setOsForApplication = function () {
    return new SetOsForApplication()
        .wine(this)
};

var RegisterFont = function () {
    var that = this;
    that._regeditFileContentNT =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Fonts]\n";

    that._regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows\\CurrentVersion\\Fonts]\n";

    that.wine = function (wine) {
        that._wine = wine;
        return that;
    };

    that.set = function (font, file) {
        that._regeditFileContentNT += "\"*" + font + "\"=\"" + file + "\"\n";
        that._regeditFileContent += "\"*" + font + "\"=\"" + file + "\"\n";

        return that;
    };

    that.do =  function () {
        that._wine.regedit().patch(that._regeditFileContentNT);
        that._wine.regedit().patch(that._regeditFileContent);
        return that._wine;
    }
};

Wine.prototype.registerFont = function () {
    return new RegisterFont()
        .wine(this)
};

