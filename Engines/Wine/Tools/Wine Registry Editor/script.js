include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "regedit"]);

/**
 * tool to open the Wine registry editor
*/
var toolImplementation = {
    run: function (container) {
        new Wine()
            .prefix(container)
            .run("regedit", [], null, false, true);
    }
};

/* exported Tool */
var Tool = Java.extend(org.phoenicis.engines.EngineTool, toolImplementation);
