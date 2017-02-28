include(["Functions", "Functions", "Engines", "Wine"]);
include(["Functions", "Functions", "Net", "Resource"]);
include(["Functions", "Functions", "Verbs", "luna"]);

Wine.prototype.physx = function() {
    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://uk.download.nvidia.com/Windows/9.14.0702/PhysX-9.14.0702-SystemSoftware.msi")
        .checksum("81e2d38e2356e807ad80cdf150ed5acfff839c8b")
        .name("PhysX-9.14.0702-SystemSoftware.msi")
        .get();

    this.run("msiexec", ["/i", setupFile, "/q"])
        .wait("Please wait while {0} is installed ...".format("PhysX"));

    return this;
};
