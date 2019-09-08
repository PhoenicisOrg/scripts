const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * sets OpenGL max core version
 * @param {number} major major version
 * @param {number} minor minor version
 * @returns {Wine} Wine object
 */
Wine.prototype.setVersionGL = function (major, minor) {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
        "\"MaxVersionGL\"=dword:000"+ major + "000" + minor
    this.regedit().patch(regeditFileContent);
    return this;
};