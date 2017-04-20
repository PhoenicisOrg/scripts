include(["Functions", "Engines", "Wine"]);
include(["Functions", "Net", "Resource"]);
include(["Functions", "Verbs", "luna"]);

Wine.prototype.vcrun2013 = function() {
    var setupFile32 = new Resource()
        .wizard(this._wizard)
        .url("http://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x86.exe")
        .checksum("df7f0a73bfa077e483e51bfb97f5e2eceedfb6a3")
        .name("vcredist_x86.exe")
        .get();

    this.run(setupFile32, "/q")
        .wait("Please wait while {0} is installed ...".format("Microsoft Visual C++ 2013 Redistributable (x86)"));

    if (this.architecture() == "amd64") {
        var setupFile64 = new Resource()
            .wizard(this._wizard)
            .url("http://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x64.exe")
            .checksum("8bf41ba9eef02d30635a10433817dbb6886da5a2")
            .name("vcredist_x64.exe")
            .get();

        this.run(setupFile64, "/q")
            .wait("Please wait while {0} is installed ...".format("Microsoft Visual C++ 2013 Redistributable (x64)"));
    }

    this.overrideDLL()
        .set("native, builtin", ["atl120", "msvcp120", "msvcr120", "vcomp120"])
        .do();

    return this;
};
