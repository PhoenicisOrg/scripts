include(["engines", "wine", "engine", "object"]);

/**
 * tool to kill running Wine processes
 * @constructor
 */
var KillWineProcesses = function () {
};

/**
* runs the tool
* @param {String} container name
* @returns {void}
*/
KillWineProcesses.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("kill")
        .wait();
};

/**
* runs the KillWineProcesses tool
* @param {String} container name
* @returns {void}
*/
function run(container) { // eslint-disable-line no-unused-vars
    var tool = new KillWineProcesses();
    tool.run(container);
}
