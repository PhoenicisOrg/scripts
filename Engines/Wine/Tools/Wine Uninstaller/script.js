include("engines.wine.engine.object");

/**
 * Tool to uninstall Wine
 */
// eslint-disable-next-line no-unused-vars
class UninstallWineTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .run("uninstaller", [], null, false, true);
    }
}
