include(["engines", "wine", "engine", "object"]);

/**
 * tool to open a terminal in a Wine prefix
 */
var toolImplementation = {
    _TerminalOpener: Bean("terminalOpener"),
    run: function (container) {
        var wine = new Wine()
            .prefix(container);
        var environment = [];
        environment["WINEPREFIX"] = wine.prefixDirectory;
        environment["PATH"] = wine.binPath() + ":$PATH";
        this._TerminalOpener.openTerminal(wine.prefixDirectory, environment);
    }
};

/* exported Tool */
var Tool = Java.extend(org.phoenicis.engines.EngineTool, toolImplementation);
