const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");
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