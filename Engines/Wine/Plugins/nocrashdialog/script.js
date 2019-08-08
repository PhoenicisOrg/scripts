const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * disables the crashdialog
 * @returns {Wine} Wine object
 */
Wine.prototype.nocrashdialog = function () {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\WineDbg]\n" +
        "\"ShowCrashDialog\"=\"00000000\""
    this.regedit().patch(regeditFileContent);
    return this;
};
