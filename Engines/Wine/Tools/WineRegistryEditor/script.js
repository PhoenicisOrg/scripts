include(["Engines", "Wine", "Engine", "Object"]);

var WineRegistryEditor = function() {
};

WineRegistryEditor.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("regedit")
        .wait();
};
