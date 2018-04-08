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
*/
function run(container) {
    var tool = new RepairWinePrefix();
    tool.run(container);
}
