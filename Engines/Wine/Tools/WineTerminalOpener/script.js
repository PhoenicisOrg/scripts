include(["Engines", "Wine", "Engine", "Object"]);

/**
 * tool to open a terminal in a Wine prefix
 * @constructor
 */
var WineTerminalOpener = function() {
    this._TerminalOpener = Bean("terminalOpener");
};

/**
* runs the tool
* @param {String} container name
*/
WineTerminalOpener.prototype.run = function (container) {
    var wine = new Wine()
        .prefix(container);
    var environment = [];
    environment["WINEPREFIX"] = wine.prefixDirectory;
    environment["PATH"] = wine.binDir() + ":$PATH";
    this._TerminalOpener.openTerminal(wine.prefixDirectory, environment);
};
