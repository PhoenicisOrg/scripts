include("engines.wine.engine.object");

/**
 * Tool to configure Wine
 */
class ConfigureWineTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .run("winecfg", [], null, false, true);
    }
}
