const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");
include("engines.wine.plugins.regedit");

/**
 * enable command stream multi-threading
 * @returns {Wine} Wine object
 */
Wine.prototype.enableCSMT = function () {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
        "\"csmt\"=dword:1"
    this.regedit().patch(regeditFileContent);
    return this;
};