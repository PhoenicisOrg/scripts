include(["engines", "wine", "engine", "object"]);

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
WineUninstaller.prototype.run = function(container) {
    new Wine()
        .prefix(container)
        .run("uninstaller")
        .wait();
};
