const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");
include("engines.wine.plugins.regedit");

/**
 * force the UseTakeFocus
 * @param {string} mode ("Y" or "N")
 * @returns {Wine} Wine object
 */
Wine.prototype.UseTakeFocus = function (mode) {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\X11 Driver]\n" +
        "\"UseTakeFocus\"=\"" + mode + "\"\n";
    this.regedit().patch(regeditFileContent);
    return this;
};
