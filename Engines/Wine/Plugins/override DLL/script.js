const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

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