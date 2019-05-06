include("engines.wine.engine.object");

/**
 * tool to uninstall Wine
*/
var toolImplementation = {
    run: function (container) {
        new Wine()
            .prefix(container)
            .run("uninstaller", [], null, false, true);
    }
};

/* exported Tool */
var Tool = Java.extend(org.phoenicis.engines.EngineTool, toolImplementation);

