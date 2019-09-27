const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * Plugin to enable command stream multi-threading
 */
module.default = class CSMT {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const regeditFileContent = `REGEDIT4\n\n[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n"csmt"=dword:1`;

        this.wine.regedit().patch(regeditFileContent);
    }
};
