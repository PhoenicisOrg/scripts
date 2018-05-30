include(["engines", "wine", "engine", "object"]);

/**
 * tool to configure Wine
*/
var toolImplementation = {
    run: function (container) {
        new Wine()
            .prefix(container)
            .run("winecfg", [], null, false, true);
    }
};

/* exported Tool */
var Tool = Java.extend(org.phoenicis.engines.EngineTool, toolImplementation);
