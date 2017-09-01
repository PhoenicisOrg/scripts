include(["Engines", "Wine", "Engine", "Object"]);

var WineUninstaller = function() {
};

WineUninstaller.prototype.run = function (container) {
    new Wine()
        .prefix(container)
        .run("uninstaller")
        .wait();
};
