const Regedit = include("engines.wine.plugins.regedit");

/**
 * Plugin to force UseTakeFocus
 */
module.default = class TakeFocus {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Specifies the mode
     *
     * @param {string} mode "Y" or "N"
     * @returns {TakeFocus} This
     */
    withMode(mode) {
        this.mode = mode;

        return this;
    }

    go() {
        const regeditFileContent = `REGEDIT4\n\n[HKEY_CURRENT_USER\\Software\\Wine\\X11 Driver]\n"UseTakeFocus"="${this.mode}"\n`;

        new Regedit(this.wine).patch(regeditFileContent);
    }
};
