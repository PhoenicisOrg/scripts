const Regedit = include("engines.wine.plugins.regedit");

/**
 * Plugin to manage the hdpi state

 * @returns {boolean|Wine} get: if is hdpi, set: Wine object
 */
module.default = class HDPI {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Specifies whether hdpi should be enabled or not
     *
     * @param {boolean} hdpi true if hdpi shall be enabled
     * @returns {HDPI} This
     */
    withHdpi(hdpi) {
        this.hdpi = hdpi;

        return this;
    }

    fetchHdpiInformation() {
        if (this.hdpi) {
            return {
                yn: "y",
                fontDpiLogPixels: "dword:000000C0"
            };
        } else {
            return {
                yn: "n",
                fontDpiLogPixels: "dword:00000060"
            };
        }
    }

    /**
     * Fetches whether hdpi is enabled or not
     *
     * @returns {boolean} True if hdpi is enabled, false otherwise
     */
    isHdpi() {
        const hdpi = new Regedit(this.wine).fetchValue([
            "HKEY_CURRENT_USER",
            "Software",
            "Wine",
            "Mac Driver",
            "RetinaMode"
        ]);

        return hdpi == "y";
    }

    go() {
        const { yn, fontDpiLogPixels } = this.fetchHdpiInformation();

        const regeditFileContent =
            `REGEDIT4\n\n` +
            `[HKEY_CURRENT_USER\\Software\\Wine\\Mac Driver]\n` +
            `"RetinaMode"="${yn}"\n\n` +
            `[HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Hardware Profiles\\Current\\Software\\Fonts]\n` +
            `"LogPixels"=${fontDpiLogPixels}\n`;

        new Regedit(this.wine).patch(regeditFileContent);
    }
};
