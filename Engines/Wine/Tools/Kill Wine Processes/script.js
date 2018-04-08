include(["engines", "wine", "engine", "object"]);

/**
 * tool to kill running Wine processes
 * @constructor
 */
var KillWineProcesses = function() {
};

/**
* runs the tool
* @param {String} container name
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
*/
function run(container) {
    var tool = new KillWineProcesses();
    tool.run(container);
}
