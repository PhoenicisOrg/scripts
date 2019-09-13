const Wine = include("engines.wine.engine.object");

/**
 * Tool to configure Wine
 */
// eslint-disable-next-line no-unused-vars
module.default = class ConfigureWineTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .run("winecfg", [], null, false, true);
    }
}
