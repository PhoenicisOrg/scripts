include(["Engines", "Wine", "Engine", "Object"]);

var WineTaskManager = function() {
};

WineTaskManager.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("taskmgr")
        .wait();
};
