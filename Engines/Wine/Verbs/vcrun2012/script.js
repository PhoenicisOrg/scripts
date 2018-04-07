include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "net", "resource"]);
include(["Engines", "Wine", "Verbs", "luna"]);

/**
* Verb to install vcrun2012
* @returns {Wine}
*/
Wine.prototype.vcrun2012 = function() {
    var setupFile32 = new Resource()
        .wizard(this._wizard)
        .url("http://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x86.exe")
        .checksum("96b377a27ac5445328cbaae210fc4f0aaa750d3f")
        .name("vcredist_x86.exe")
        .get();

    this.run(setupFile32, "/q")
        .wait(tr("Please wait while {0} is installed ...", "Microsoft Visual C++ 2012 Redistributable (x86)"));

    if (this.architecture() == "amd64") {
        var setupFile64 = new Resource()
            .wizard(this._wizard)
            .url("http://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x64.exe")
            .checksum("1a5d93dddbc431ab27b1da711cd3370891542797")
            .name("vcredist_x64")
            .get();

        this.run(setupFile64, "/q")
            .wait(tr("Please wait while {0} is installed ...", "Microsoft Visual C++ 2012 Redistributable (x64)"));
    }

    var dlls = [
        "atl110",
        "msvcp110",
        "msvcr110",
        "vcomp110"
    ];
    this.overrideDLL()
        .set("native, builtin", dlls)
        .do();

    return this;
};
