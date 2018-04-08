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
* @returns {void}
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
* @returns {void}
*/
function run(container) { // eslint-disable-line no-unused-vars
    var tool = new ConfigureWine();
    tool.run(container);
}
