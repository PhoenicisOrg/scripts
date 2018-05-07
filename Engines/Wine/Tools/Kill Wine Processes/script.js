include(["engines", "wine", "engine", "object"]);

/**
 * tool to kill running Wine processes
*/
var toolImplementation = {
    run: function (container) {
        new Wine()
            .prefix(container)
            .run("kill")
            .wait();
    }
};

/* exported Tool */
var Tool = Java.extend(org.phoenicis.engines.EngineTool, toolImplementation);
