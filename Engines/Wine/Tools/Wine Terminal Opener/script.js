const Wine = include("engines.wine.engine.object");

/**
 * Tool to open a terminal in a Wine prefix
 */
// eslint-disable-next-line no-unused-vars
module.default = class WineTerminalOpenerTool {
    constructor() {
        this.terminalOpener = Bean("terminalOpener");
    }

    run(container) {
        var wine = new Wine()
            .prefix(container);

        var environment = [];

        environment["WINEPREFIX"] = wine.prefixDirectory();
        environment["PATH"] = wine.binPath() + ":$PATH";
        environment["LD_LIBRARY_PATH"] = Bean("propertyReader").getProperty("application.environment.ld");
        environment["TERM"] = "xterm";

        var wineEnginesDirectory = Bean("propertyReader").getProperty("application.user.engines") + "/wine";
        var winePath = wine.binPath().substring(0, wine.binPath().length - 5); //trim /bin/

        if (wine.architecture() == "amd64") {
            environment["LD_LIBRARY_PATH"] =
                wineEnginesDirectory + "/runtime/lib64/:" +
                wineEnginesDirectory + "/runtime/lib/:" +
                winePath + "/lib64/:" +
                winePath + "/lib/:" +
                environment["LD_LIBRARY_PATH"];
        } else {
            environment["LD_LIBRARY_PATH"] =
                wineEnginesDirectory + "/runtime/lib/:" +
                winePath + "/lib/:" +
                environment["LD_LIBRARY_PATH"];
        }

        this.terminalOpener.openTerminal(wine.prefixDirectory(), environment);
    }
}
