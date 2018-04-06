include(["Engines", "Wine", "Engine", "Object"]);

/**
 * tool to open the Wine registry editor
 * @constructor
 */
var WineRegistryEditor = function() {
};

/**
* runs the tool
* @param {String} container name
*/
WineRegistryEditor.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("regedit")
        .wait();
};
