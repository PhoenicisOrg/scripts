const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * Plugin to force the DirectDrawRenderer
 */
module.default = class DirectDrawRenderer {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Selects the used direct draw mode (either gdi or opengl)
     *
     * @param {string} mode gdi or opengl
     * @returns {DirectDrawRenderer} This
     */
    withMode(mode) {
        this.mode = mode;

        return this;
    }

    go() {
        const regeditFileContent = `REGEDIT4\n\n[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n"DirectDrawRenderer"="${this.mode}"`;

        this.wine.regedit().patch(regeditFileContent);
    }
};
