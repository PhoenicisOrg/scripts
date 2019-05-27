include("engines.wine.engine.object");

/**
 * disables the crashdialog
 * @param {string} 
 * @returns {Wine} Wine object
 */
Wine.prototype.DirectDrawRenderer = function () {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\WineDbg]\n" +
        "\"ShowCrashDialog\"=\"" + 00000000 + "\""
    this.regedit().patch(regeditFileContent);
    return this;
};
