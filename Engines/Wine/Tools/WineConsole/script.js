include(["Engines", "Wine", "Engine", "Object"]);

var WineConsole = function() {
};

WineConsole.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("wineconsole")
        .wait();
};
