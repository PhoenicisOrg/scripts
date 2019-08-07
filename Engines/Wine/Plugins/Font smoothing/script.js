const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");

/**
 * Force the Font smoothing
 * @param {string} mode ("RGB", "BGR" or "Gray Scale")
 * @returns {Wine} Wine object
 */
Wine.prototype.fontSmoothing = function (mode) {
    if (mode === undefined)
    {
        throw tr("No font smoothing mode specified!")
    }
    let fontSmoothingType;
    let fontSmoothingOrientation;
    if (mode === "RGB") {
        fontSmoothingType = "2";
        fontSmoothingOrientation = "1";
    }
    else if (mode === "BGR") {
        fontSmoothingType = "2";
        fontSmoothingOrientation = "0";
    }
    else if (mode === "Gray Scale"){
        fontSmoothingType = "1";
        fontSmoothingOrientation = "1";
    }
    else {
        throw tr("Unknown font smoothing mode: \"{0}\"", mode);
    }

    const regeditFileContent =
                        "REGEDIT4\n"                                                            +
			"\n"                                                                    +
			"[HKEY_CURRENT_USER\\Control Panel\\Desktop]\n"                         +
			"\"FontSmoothing\"=\"2\"\n"                                             +
			"\"FontSmoothingType\"=dword:0000000" + fontSmoothingType + "\n"        +
			"\"FontSmoothingGamma\"=dword:00000578\n"                               +
			"\"FontSmoothingOrientation\"=dword:0000000" + fontSmoothingOrientation + "\n";

    this.regedit().patch(regeditFileContent);
    return this;
};
