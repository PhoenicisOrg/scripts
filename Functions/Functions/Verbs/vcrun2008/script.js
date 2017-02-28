include(["Functions", "Functions", "Engines", "Wine"]);
include(["Functions", "Functions", "Net", "Resource"]);
include(["Functions", "Functions", "Verbs", "luna"]);

Wine.prototype.vcrun2008 = function() {
    var setupFile32 = new Resource()
        .wizard(this._wizard)
        .url("http://download.microsoft.com/download/5/D/8/5D8C65CB-C849-4025-8E95-C3966CAFD8AE/vcredist_x86.exe")
        .checksum("470640aa4bb7db8e69196b5edb0010933569e98d")
        .name("vcredist_x86.exe")
        .get();

    this.run(setupFile32, "/q")
        .wait("Please wait while {0} is installed ...".format("Microsoft Visual C++ 2008 Redistributable (x86)"));

    if (this.architecture() == "amd64") {
        var setupFile64 = new Resource()
            .wizard(this._wizard)
            .url("https://download.microsoft.com/download/5/D/8/5D8C65CB-C849-4025-8E95-C3966CAFD8AE/vcredist_x64.exe")
            .checksum("a7c83077b8a28d409e36316d2d7321fa0ccdb7e8")
            .name("vcredist_x64.exe")
            .get();

        this.run(setupFile64, "/q")
            .wait("Please wait while {0} is installed ...".format("Microsoft Visual C++ 2008 Redistributable (x64)"));
    }

    var dlls = [
        "atl90",
        "msvcm90",
        "msvcp90",
        "msvcr90",
        "vcomp90",
    ];
    this.overrideDLL()
        .set("native, builtin", dlls)
        .do();

    return this;
};
