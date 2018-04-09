include(["engines", "wine", "engine", "object"]);

/**
 * tool to open a terminal in a Wine prefix
 * @constructor
 */
var WineTerminalOpener = function () {
    this._TerminalOpener = Bean("terminalOpener");
};

/**
* runs the tool
* @param {String} container name
* @returns {void}
*/
WineTerminalOpener.prototype.run = function (container) {
    var wine = new Wine()
        .prefix(container);
    var environment = [];
    environment["WINEPREFIX"] = wine.prefixDirectory;
    environment["PATH"] = wine.binPath() + ":$PATH";
    this._TerminalOpener.openTerminal(wine.prefixDirectory, environment);
};

/**
* runs the WineTerminalOpener tool
* @param {String} container name
* @returns {void}
*/
function run(container) { // eslint-disable-line no-unused-vars
    var tool = new WineTerminalOpener();
    tool.run(container);
}
