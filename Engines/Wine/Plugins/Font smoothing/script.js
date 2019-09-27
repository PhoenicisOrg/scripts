const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * Plugin to force the Font smoothing
 */
module.default = class FontSmoothing {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Specifies the used font smoothing mode
     *
     * @param {string} mode "RGB", "BGR" or "Gray Scale"
     * @returns {FontSmoothing} This
     */
    withMode(mode) {
        this.mode = mode;

        return this;
    }

    fetchSmootingSettings() {
        const mode = this.mode;

        if (mode === "RGB") {
            return {
                fontSmoothingType: "2",
                fontSmoothingOrientation: "1"
            };
        } else if (mode === "BGR") {
            return {
                fontSmoothingType: "2",
                fontSmoothingOrientation: "0"
            };
        } else if (mode === "Gray Scale") {
            return {
                fontSmoothingType: "1",
                fontSmoothingOrientation: "1"
            };
        } else {
            throw tr('Unknown font smoothing mode: "{0}"', mode);
        }
    }

    go() {
        const mode = this.mode;

        if (mode === undefined) {
            throw new Error(tr("No font smoothing mode specified!"));
        }

        const { fontSmoothingType, fontSmoothingOrientation } = this.fetchSmootingSettings();

        const regeditFileContent =
            `REGEDIT4\n\n` +
            `[HKEY_CURRENT_USER\\Control Panel\\Desktop]\n` +
            `"FontSmoothing"="2"\n` +
            `"FontSmoothingType"=dword:0000000${fontSmoothingType}\n` +
            `"FontSmoothingGamma"=dword:00000578\n` +
            `"FontSmoothingOrientation"=dword:0000000${fontSmoothingOrientation}\n`;

        this.wine.regedit().patch(regeditFileContent);
    }
};

/**
 * Force the Font smoothing
 * @param {string} mode ("RGB", "BGR" or "Gray Scale")
 * @returns {Wine} Wine object
 */
Wine.prototype.fontSmoothing = function (mode) {
    if (mode === undefined) {
        throw tr("No font smoothing mode specified!");
    }
    let fontSmoothingType;
    let fontSmoothingOrientation;
    if (mode === "RGB") {
        fontSmoothingType = "2";
        fontSmoothingOrientation = "1";
    } else if (mode === "BGR") {
        fontSmoothingType = "2";
        fontSmoothingOrientation = "0";
    } else if (mode === "Gray Scale") {
        fontSmoothingType = "1";
        fontSmoothingOrientation = "1";
    } else {
        throw tr('Unknown font smoothing mode: "{0}"', mode);
    }

    const regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CURRENT_USER\\Control Panel\\Desktop]\n" +
        '"FontSmoothing"="2"\n' +
        '"FontSmoothingType"=dword:0000000' +
        fontSmoothingType +
        "\n" +
        '"FontSmoothingGamma"=dword:00000578\n' +
        '"FontSmoothingOrientation"=dword:0000000' +
        fontSmoothingOrientation +
        "\n";

    this.regedit().patch(regeditFileContent);
    return this;
};
