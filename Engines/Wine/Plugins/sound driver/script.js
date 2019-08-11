const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * sets sound driver
 * @param {string} driver (alsa, pulse)
 * @returns {Wine} Wine object
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