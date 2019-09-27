const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");
const FontSmoothing = include("engines.wine.plugins.font_smoothing");

/**
 * Setting to set the Fonts Smoothing
 */
// eslint-disable-next-line no-unused-vars
module.default = class FontSmoothingSetting {
    constructor() {
        this.options = [tr("Default"), tr("RGB"), tr("BGR"), tr("Gray Scale")];
    }

    getText() {
        return tr("Fonts Smoothing");
    }

    getOptions() {
        return this.options;
    }

    getCurrentOption(container) {
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
        } else {
            if (fontSmoothingType == 2) {
                if (fontSmoothingOrientation == 1) {
                    index = 1;
                } else {
                    index = 2;
                }
            } else if (fontSmoothingType == 1) {
                index = 3;
            }
        }

        return this.options[index];
    }

    setOption(container, optionIndex) {
        if (0 === optionIndex) {
            const regeditFileContent =
                "REGEDIT4\n" +
                "\n" +
                "[HKEY_CURRENT_USER\\Control Panel\\Desktop]\n" +
                '"FontSmoothing"="1"\n' +
                '"FontSmoothingType"=dword:00000001\n' +
                '"FontSmoothingGamma"=dword:00000000\n' +
                '"FontSmoothingOrientation"=dword:00000001';

            new Wine()
                .prefix(container)
                .regedit()
                .patch(regeditFileContent);
        } else {
            const wine = new Wine().prefix(container);

            new FontSmoothing(wine).withMode(this.options[optionIndex]).go();
        }
    }
};
