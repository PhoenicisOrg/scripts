include(["engines", "wine", "engine", "object"]);

/**
 * tool to repair a Wine prefix
*/
var toolImplementation = {
    run: function (container) {
        new Wine()
            .prefix(container)
            .run("wineboot", [], null, false, true);
    }
};

/* exported Tool */
var Tool = Java.extend(org.phoenicis.engines.EngineTool, toolImplementation);
