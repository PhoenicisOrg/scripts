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
*/
function run(container) {
    var tool = new RebootWine();
    tool.run(container);
}
