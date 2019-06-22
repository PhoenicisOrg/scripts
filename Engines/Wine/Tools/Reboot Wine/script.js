include("engines.wine.engine.object");

/**
 * Tool to reboot Wine
 */
class RebootWineTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .run("wineboot", [], null, false, true);
    }
}
