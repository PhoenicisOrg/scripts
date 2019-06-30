include("engines.wine.engine.object");

/**
 * Tool to reboot Wine
 */
// eslint-disable-next-line no-unused-vars
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
