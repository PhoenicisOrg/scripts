const Wine = include("engines.wine.engine.object");

/**
 * Tool to open the Wine task manager
 */
// eslint-disable-next-line no-unused-vars
module.default = class WineTaskManagerTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .run("taskmgr", [], null, false, true);
    }
}
