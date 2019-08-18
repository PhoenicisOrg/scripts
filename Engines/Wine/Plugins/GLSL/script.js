const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * force the Use of GLSL
 * @param {string} mode (enabled or disabled)
 * @returns {Wine} Wine object
 */
Wine.prototype.UseGLSL = function (mode) {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
        "\"UseGLSL\"=\"" + mode + "\""
    this.regedit().patch(regeditFileContent);
    return this;
};