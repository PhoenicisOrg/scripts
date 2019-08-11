const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
* gets/sets hdpi state
* @param {boolean} [hdpi] true if hdpi shall be enabled
* @returns {boolean|Wine} get: if is hdpi, set: Wine object
*/
Wine.prototype.hdpi = function (hdpi) {
    // get
    if (arguments.length == 0) {
        return (this.regedit().fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Mac Driver", "RetinaMode"]) == "y");
    }

    // set
    var hdpiYn = hdpi ? "y" : "n";
    var fontDpiLogPixels = hdpi ? "dword:000000C0" : "dword:00000060"

    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Mac Driver]\n" +
        "\"RetinaMode\"=\"" + hdpiYn + "\"\n" +
        "\n" +
        "[HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Hardware Profiles\\Current\\Software\\Fonts]\n" +
        "\"LogPixels\"=" + fontDpiLogPixels + "\n";
    this.regedit().patch(regeditFileContent);
    return this;
};
