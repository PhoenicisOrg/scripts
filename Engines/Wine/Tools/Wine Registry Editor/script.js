const Wine = include("engines.wine.engine.object");

/**
 * Tool to open the Wine registry editor
 */
// eslint-disable-next-line no-unused-vars
module.default = class WineRegistryEditorTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine().prefix(container).run("regedit", [], null, false, true);
    }
};
