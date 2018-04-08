include(["engines", "wine", "engine", "object"]);

/**
 * tool to reboot Wine
 * @constructor
 */
var RebootWine = function() {
};

/**
* runs the tool
* @param {String} container name
* @returns {void}
*/
RebootWine.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("wineboot")
        .wait();
};

/**
* runs the RebootWine tool
* @param {String} container name
* @returns {void}
*/
function run(container) { // eslint-disable-line no-unused-vars
    var tool = new RebootWine();
    tool.run(container);
}
