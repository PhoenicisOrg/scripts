const Regedit = include("engines.wine.plugins.regedit");

/**
 * Plugin to force the use of GLSL
 */
module.default = class GLSL {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Specifies the mode
     *
     * @param {string} mode enabled or disabled
     * @returns {GLSL} This
     */
    withMode(mode) {
        this.mode = mode;

        return this;
    }

    go() {
        const regeditFileContent = `REGEDIT4\n\n[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n"UseGLSL"="${this.mode}"`;

        new Regedit(this.wine).patch(regeditFileContent);
    }
};
