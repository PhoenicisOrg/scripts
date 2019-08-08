const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * default windows version
 * @param {string} version (win7, vista, win2003, winxp, win2k, winnt, winme, win98, win95, win31)
 * @param {string} [servicePack] e.g. sp3
 * @returns {string|Wine} get: Windows version, set: Wine object
 */
Wine.prototype.windowsVersion = function (version, servicePack) {
    // get
    if (arguments.length == 0) {
        return this.regedit().fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Version"]);
    }

    // set
    var regeditFileContent;
    if (version == null) {
        regeditFileContent =
            "REGEDIT4\n" +
            "\n" +
            "[HKEY_CURRENT_USER\\Software\\Wine]\n" +
            "\"Version\"=-\n";
    } else {
        regeditFileContent =
            "REGEDIT4\n" +
            "\n" +
            "[HKEY_CURRENT_USER\\Software\\Wine]\n" +
            "\"Version\"=\"" + version + "\"\n";

        if (servicePack) {
            var servicePackNumber = servicePack.replace("sp", "");
            regeditFileContent += "[HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion]\n";
            regeditFileContent += "\"CSDVersion\"=\"Service Pack " + servicePackNumber + "\"\n";
            regeditFileContent += "[HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\Windows]\n";
            regeditFileContent += "\"CSDVersion\"=dword:00000" + servicePackNumber + "00\n";
        }
    }

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

    that.do = function () {
        that._wine.regedit().patch(that._regeditFileContent);
        return that._wine;
    }
};

Wine.prototype.setOsForApplication = function () {
    return new SetOsForApplication()
        .wine(this)
};
