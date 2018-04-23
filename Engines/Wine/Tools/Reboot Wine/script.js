include(["engines", "wine", "engine", "object"]);

/**
 * tool to reboot Wine
*/
var toolImplementation = {
    run: function (container) {
        new Wine()
            .prefix(container)
            .run("wineboot")
            .wait();
    }
};

/* exported Tool */
var Tool = Java.extend(org.phoenicis.engines.EngineTool, toolImplementation);
