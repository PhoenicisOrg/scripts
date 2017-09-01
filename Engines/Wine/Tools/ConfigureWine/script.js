include(["Engines", "Wine", "Engine", "Object"]);

var ConfigureWine = function() {
};

ConfigureWine.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("winecfg")
        .wait();
};
