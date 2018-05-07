include(["engines", "wine", "engine", "object"]);

/**
 * tool to open a Wine console
*/
var toolImplementation = {
    run: function (container) {
        new Wine()
            .prefix(container)
            .run("wineconsole")
            .wait();
    }
};

/* exported Tool */
var Tool = Java.extend(org.phoenicis.engines.EngineTool, toolImplementation);
