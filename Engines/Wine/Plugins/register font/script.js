const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

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