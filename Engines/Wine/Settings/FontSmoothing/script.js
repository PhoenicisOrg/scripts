include("engines.wine.engine.object");
include("engines.wine.plugins.regedit");
include("engines.wine.plugins.font_smoothing");

/**
 * setting to set the Fonts Smoothing
*/
var settingImplementation = {
    _options: [tr("Default"), tr("RGB"), tr("BGR"), tr("Gray Scale")],

    _registryValues: [],

    getText: function () {
        return tr("Fonts Smoothing");
    },
    getOptions: function () {
        return this._options;
    },
    getCurrentOption: function (container) {
        var FontSmoothing = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Control Panel", "Desktop", "FontSmoothing"]);

        var FontSmoothingType = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Control Panel", "Desktop", "FontSmoothingType"]);

        var FontSmoothingOrientation = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Control Panel", "Desktop", "FontSmoothingOrientation"]);

        var index;

        if (FontSmoothing == 1) {
            index = 0;
        }
        else {
            if (FontSmoothingType == 2) {
                if (FontSmoothingOrientation == 1) {
                    index = 1;
                }
                else {
                    index = 2;
                }
            }
            else if (FontSmoothingType == 1) {
                index = 3;
            }
        }

        return this._options[index];
    },
    setOption: function (container, optionIndex) {
        var regeditFileContent;
        if (0 == optionIndex) {
            regeditFileContent =
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
                .FontSmoothing(this.options[optionIndex]);
        }
    }
};

/* exported Setting */
var Setting = Java.extend(org.phoenicis.engines.EngineSetting, settingImplementation);
