include(["engines", "wine", "engine", "object"]);

/**
 * tool to repair a Wine prefix
 * @constructor
 */
var RepairWinePrefix = function() {
};

/**
* runs the tool
* @param {String} container name
* @returns {void}
*/
RepairWinePrefix.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("wineboot")
        .wait();
};

/**
* runs the RepairWinePrefix tool
* @param {String} container name
* @returns {void}
*/
function run(container) { // eslint-disable-line no-unused-vars
    var tool = new RepairWinePrefix();
    tool.run(container);
}
