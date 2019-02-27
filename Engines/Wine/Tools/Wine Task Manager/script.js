include("engines.wine.engine.object");

/**
 * tool to open the Wine task manager
*/
var toolImplementation = {
    run: function (container) {
        new Wine()
            .prefix(container)
            .run("taskmgr", [], null, false, true);
    }
};

/* exported Tool */
var Tool = Java.extend(org.phoenicis.engines.EngineTool, toolImplementation);
