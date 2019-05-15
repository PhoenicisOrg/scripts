include("engines.wine.engine.object");

/**
 * force the Font smothing
 * @param {string} mode ("RGB", "BGR" or "Gray Scale")
 * @returns {Wine} Wine object
 */
Wine.prototype.FontSmoothing = function (mode) {
    var FontSmoothingType;
    var FontSmoothingOrientation;
    if (mode == "RGB") {
        FontSmoothingType = "2";
        FontSmoothingOrientation = "1";
    }
    else if (mode == "BGR") {
        FontSmoothingType = "2";
        FontSmoothingOrientation = "0";
    }
    else if (mode == "Gray Scale"){
        FontSmoothingType = "1";
        FontSmoothingOrientation = "1";
    }

    var regeditFileContent =
                        "REGEDIT4\n"					+
			"\n"						+
			"[HKEY_CURRENT_USER\\Control Panel\\Desktop]\n"	+
			"\"FontSmoothing\"=\"2\"\n"			+
			"\"FontSmoothingType\"=dword:0000000" + FontSmoothingType + "\n"	+
			"\"FontSmoothingGamma\"=dword:00000578\n"	+
			"\"FontSmoothingOrientation\"=dword:0000000" + FontSmoothingOrientation + "\n";

    this.regedit().patch(regeditFileContent);
    return this;
};
