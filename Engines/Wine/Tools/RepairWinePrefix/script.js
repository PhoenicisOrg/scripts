include(["Engines", "Wine", "Engine", "Object"]);

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
