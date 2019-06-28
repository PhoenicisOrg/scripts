include("engines.wine.engine.object");
include("engines.wine.plugins.regedit");
include("engines.wine.plugins.font_smoothing");

/**
 * Setting to set the Fonts Smoothing
 */
var settingImplementation = {
    _options: [tr("Default"), tr("RGB"), tr("BGR"), tr("Gray Scale")],

    getText: function () {
        return tr("Fonts Smoothing");
    },
    getOptions: function () {
        return this._options;
    },
    getCurrentOption: function (container) {
        const fontSmoothing = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Control Panel", "Desktop", "FontSmoothing"]);

        const fontSmoothingType = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Control Panel", "Desktop", "FontSmoothingType"]);

        const fontSmoothingOrientation = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Control Panel", "Desktop", "FontSmoothingOrientation"]);

        let index;

        if (fontSmoothing == 1) {
            index = 0;
        }
        else {
            if (fontSmoothingType == 2) {
                if (fontSmoothingOrientation == 1) {
                    index = 1;
                }
                else {
                    index = 2;
                }
            }
            else if (fontSmoothingType == 1) {
                index = 3;
            }
        }

        return this._options[index];
    },
    setOption: function (container, optionIndex) {
        if (0 === optionIndex) {
            const regeditFileContent =
			"REGEDIT4\n"					+
			"\n"						+
			"[HKEY_CURRENT_USER\\Control Panel\\Desktop]\n"	+
			"\"FontSmoothing\"=\"1\"\n"		 	+
			"\"FontSmoothingType\"=dword:00000001\n"	+
			"\"FontSmoothingGamma\"=dword:00000000\n"	+
			"\"FontSmoothingOrientation\"=dword:00000001";

            new Wine()
                .prefix(container)
                .regedit()
                .patch(regeditFileContent);
        }
        else {
            new Wine()
                .prefix(container)
                .fontSmoothing(this._options[optionIndex]);
        }
    }
};

/* exported Setting */
var Setting = Java.extend(org.phoenicis.engines.EngineSetting, settingImplementation);
