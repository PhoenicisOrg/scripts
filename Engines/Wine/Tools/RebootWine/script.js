include(["Engines", "Wine", "Engine", "Object"]);

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
