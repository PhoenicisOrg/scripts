const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");

/**
 * Tool to repair a Wine prefix
 */
// eslint-disable-next-line no-unused-vars
class RepairWinePrefixTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .run("wineboot", [], null, false, true);
    }
}
