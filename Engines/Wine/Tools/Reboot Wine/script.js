const Wine = include("engines.wine.engine.object");

/**
 * Tool to reboot Wine
 */
// eslint-disable-next-line no-unused-vars
module.default = class RebootWineTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .run("wineboot", [], null, false, true);
    }
}
