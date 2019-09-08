const Wine = include("engines.wine.engine.object");

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