include(["Functions", "Engines", "Wine"]);
include(["Functions", "Net", "Resource"]);
include(["Functions", "Verbs", "luna"]);

Wine.prototype.vcrun2005 = function() {
    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://download.microsoft.com/download/8/B/4/8B42259F-5D70-43F4-AC2E-4B208FD8D66A/vcredist_x86.EXE")
        .checksum("b8fab0bb7f62a24ddfe77b19cd9a1451abd7b847")
        .name("vcredist_x86.EXE")
        .get();

    this.run(setupFile, "/q")
        .wait("Please wait while {0} is installed ...".format("Microsoft Visual C++ 2005 Redistributable (x86)"));

    var dlls = [
        "atl80.dll",
        "msvcm80.dll",
        "msvcp80.dll",
        "msvcr80.dll",
        "vcomp.dll"
    ];
    this.overrideDLL()
        .set("native, builtin", dlls)
        .do();

    return this;
};
