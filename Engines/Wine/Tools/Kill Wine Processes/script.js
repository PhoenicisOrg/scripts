include("engines.wine.engine.object");

/**
 * Tool to kill running Wine processes
 */
class KillWineProcessesTool {
    constructor() {
        // do nothing
    }

    run(container) {
        new Wine()
            .prefix(container)
            .kill()
    }
}
