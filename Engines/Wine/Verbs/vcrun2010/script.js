include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);
include(["Engines", "Wine", "Verbs", "luna"]);

Wine.prototype.vcrun2010 = function() {
    var setupFile32 = new Resource()
        .wizard(this._wizard)
        .url("http://download.microsoft.com/download/5/B/C/5BC5DBB3-652D-4DCE-B14A-475AB85EEF6E/vcredist_x86.exe")
        .checksum("372d9c1670343d3fb252209ba210d4dc4d67d358")
        .name("vcredist_x86.exe")
        .get();

    this.run(setupFile32, "/q")
        .wait(tr("Please wait while {0} is installed ...", "Microsoft Visual C++ 2010 Redistributable (x86)"));

    if (this.architecture() == "amd64") {
        var setupFile64 = new Resource()
            .wizard(this._wizard)
            .url("http://download.microsoft.com/download/A/8/0/A80747C3-41BD-45DF-B505-E9710D2744E0/vcredist_x64.exe")
            .checksum("027d0c2749ec5eb21b031f46aee14c905206f482")
            .name("vcredist_x64.exe")
            .get();

        this.run(setupFile64, "/q")
            .wait(tr("Please wait while {0} is installed ...", "Microsoft Visual C++ 2010 Redistributable (x64)"));
    }

    var dlls = [
        "atl100",
        "msvcp100",
        "msvcr100",
        "vcomp100",
    ];
    this.overrideDLL()
        .set("native, builtin", dlls)
        .do();

    return this;
};
