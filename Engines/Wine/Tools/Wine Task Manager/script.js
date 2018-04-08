include(["engines", "wine", "engine", "object"]);

/**
 * tool to open the Wine task manager
 * @constructor
 */
var WineTaskManager = function() {
};

/**
* runs the tool
* @param {String} container name
* @returns {void}
*/
WineTaskManager.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("taskmgr")
        .wait();
};

/**
* runs the WineTaskManager tool
* @param {String} container name
* @returns {void}
*/
function run(container) {
    var tool = new WineTaskManager();
    tool.run(container);
}
