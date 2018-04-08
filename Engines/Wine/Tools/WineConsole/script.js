include(["engines", "wine", "engine", "object"]);

/**
 * tool to open a Wine console
 * @constructor
 */
var WineConsole = function () {
};

/**
* runs the tool
* @param {String} container name
* @returns {void}
*/
WineConsole.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("wineconsole")
        .wait();
};

/**
* runs the WineConsole tool
* @param {String} container name
* @returns {void}
*/
function run(container) { // eslint-disable-line no-unused-vars
    var tool = new WineConsole();
    tool.run(container);
}
