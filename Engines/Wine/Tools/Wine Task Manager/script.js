include("engines.wine.engine.object");

/**
 * Tool to open the Wine task manager
 */
class WineTaskManagerTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .run("taskmgr", [], null, false, true);
    }
}
