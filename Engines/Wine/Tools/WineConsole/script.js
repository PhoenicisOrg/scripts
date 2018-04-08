include(["engines", "wine", "engine", "object"]);

/**
 * tool to open a Wine console
 * @constructor
 */
var WineConsole = function() {
};

/**
* runs the tool
* @param {String} container name
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
*/
function run(container) {
    var tool = new WineConsole();
    tool.run(container);
}
