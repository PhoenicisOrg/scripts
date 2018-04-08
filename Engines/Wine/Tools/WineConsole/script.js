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
WineConsole.prototype.run = function(container) {
    new Wine()
        .prefix(container)
        .run("wineconsole")
        .wait();
};
