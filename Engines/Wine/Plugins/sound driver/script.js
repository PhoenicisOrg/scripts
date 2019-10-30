const Regedit = include("engines.wine.plugins.regedit");

/**
 * Plugin to set the sound driver
 */
module.default = class SoundDriver {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Specifies the used sound driver
     *
     * @param {string} driver alsa or pulse
     * @returns {SoundDriver} This
     */
    withDriver(driver) {
        this.driver = driver;

        return this;
    }

    go() {
        const regeditFileContent = `REGEDIT4\n\n[HKEY_CURRENT_USER\\Software\\Wine\\Drivers]\n"Audio"="${this.driver}"\n`;

        new Regedit(this.wine).patch(regeditFileContent);
    }
};
