const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
* gets/sets managed state
* @param {boolean} [managed] true if it shall be managed
* @returns {boolean|Wine} get: if is managed, set: Wine object
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