include(["Engines", "Wine", "Engine", "Object"]);

/**
 * tool to uninstall Wine
 * @constructor
 */
var WineUninstaller = function() {
};

/**
* runs the tool
* @param {String} container name
*/
WineUninstaller.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("uninstaller")
        .wait();
};
