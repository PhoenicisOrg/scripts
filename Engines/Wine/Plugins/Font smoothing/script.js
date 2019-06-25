include("engines.wine.engine.object");

/**
 * force the Font smoothing
 * @param {string} mode ("RGB", "BGR" or "Gray Scale")
 * @returns {Wine} Wine object
 */
Wine.prototype.fontSmoothing = function (mode) {
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
        const errorMessage = "Unknown font smoothing mode: " + mode
        throw errorMessage;
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
