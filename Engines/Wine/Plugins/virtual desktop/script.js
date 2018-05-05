include(["engines", "wine", "engine", "object"]);

/**
 * sets Virtual Desktop with window resolution
 * @param {number} width width of virtual desktop (in px)
 * @param {number} height height of virtual desktop (in px)
 * @returns {Wine} Wine object
 */
Wine.prototype.setVirtualDesktop = function (width, height) {
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Explorer\\Desktops]\n" +
        "\"Default\"=\"" + width + "x" + height + "\"\n" +
        "[HKEY_CURRENT_USER\\Software\\Wine\\Explorer]\n" +
        "\"Desktop\"=\"" + "Default" + "\"\n";
    this.regedit().patch(regeditFileContent);
    return this;
};