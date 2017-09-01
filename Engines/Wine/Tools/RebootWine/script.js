include(["Engines", "Wine", "Engine", "Object"]);

var RebootWine = function() {
};

RebootWine.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("wineboot")
        .wait();
};
