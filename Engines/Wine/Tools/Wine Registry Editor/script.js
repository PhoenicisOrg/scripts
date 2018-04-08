include(["engines", "wine", "engine", "object"]);

/**
 * tool to open the Wine registry editor
 * @constructor
 */
var WineRegistryEditor = function() {
};

/**
* runs the tool
* @param {String} container name
* @returns {void}
*/
WineRegistryEditor.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("regedit")
        .wait();
};

/**
* runs the WineRegistryEditor tool
* @param {String} container name
* @returns {void}
*/
function run(container) {
    var tool = new WineRegistryEditor();
    tool.run(container);
}
