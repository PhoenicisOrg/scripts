include("engines.wine.engine.object");

/**
 * Tool to open a Wine console
 */
class WineConsoleTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .run("wineconsole", [], null, false, true);
    }
}
