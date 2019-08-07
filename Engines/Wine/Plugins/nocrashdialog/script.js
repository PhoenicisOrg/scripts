const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");

/**
 * disables the crashdialog
 * @returns {Wine} Wine object
 */
Wine.prototype.nocrashdialog = function () {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\WineDbg]\n" +
        "\"ShowCrashDialog\"=\""00000000"\""
    this.regedit().patch(regeditFileContent);
    return this;
};
