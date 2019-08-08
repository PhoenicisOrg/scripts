const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * force the DirectDrawRenderer
 * @param {string} mode (gdi or opengl)
 * @returns {Wine} Wine object
 */
Wine.prototype.DirectDrawRenderer = function (mode) {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
        "\"DirectDrawRenderer\"=\"" + mode + "\""
    this.regedit().patch(regeditFileContent);
    return this;
};