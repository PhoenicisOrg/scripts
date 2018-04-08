include(["engines", "wine", "engine", "object"]);

/**
 * tool to configure Wine
 * @constructor
 */
var ConfigureWine = function() {
};

/**
* runs the tool
* @param {String} container name
*/
ConfigureWine.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("winecfg")
        .wait();
};

/**
* runs the ConfigureWine tool
* @param {String} container name
*/
function run(container) {
    var tool = new ConfigureWine();
    tool.run(container);
}
