include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "net", "resource"]);
include(["engines", "wine", "verbs", "luna"]);

/**
* Verb to install Nvidia PhysX
* @returns {Wine} Wine object
*/
Wine.prototype.physx = function () {
    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://uk.download.nvidia.com/Windows/9.14.0702/PhysX-9.14.0702-SystemSoftware.msi")
        .checksum("81e2d38e2356e807ad80cdf150ed5acfff839c8b")
        .name("PhysX-9.14.0702-SystemSoftware.msi")
        .get();

    this.run("msiexec", ["/i", setupFile, "/q"])
        .wait(tr("Please wait while {0} is installed ...", "PhysX"));

    return this;
};
