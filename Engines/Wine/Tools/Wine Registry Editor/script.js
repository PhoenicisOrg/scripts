const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");
include("engines.wine.plugins.regedit");

/**
 * Tool to open the Wine registry editor
 */
// eslint-disable-next-line no-unused-vars
class WineRegistryEditorTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .run("regedit", [], null, false, true);
    }
}
