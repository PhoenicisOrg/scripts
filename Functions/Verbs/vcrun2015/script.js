include(["Functions", "Engines", "Wine"]);
include(["Functions", "Net", "Resource"]);
include(["Functions", "Verbs", "luna"]);

Wine.prototype.vcrun2015 = function() {
    var setupFile32 = new Resource()
        .wizard(this._wizard)
        .url("https://download.microsoft.com/download/9/3/F/93FCF1E7-E6A4-478B-96E7-D4B285925B00/vc_redist.x86.exe")
        .checksum("bfb74e498c44d3a103ca3aa2831763fb417134d1")
        .name("vc_redist.x86.exe")
        .get();

    var setupFile64 = new Resource()
        .wizard(this._wizard)
        .url("https://download.microsoft.com/download/9/3/F/93FCF1E7-E6A4-478B-96E7-D4B285925B00/vc_redist.x64.exe")
        .checksum("3155cb0f146b927fcc30647c1a904cd162548c8c")
        .name("vc_redist.x64.exe")
        .get();

    this.run(setupFile32, "/q")
        .wait("Please wait while {0} is installed ...".format("Microsoft Visual C++ 2015 Redistributable (x86)"));

    this.run(setupFile64, "/q")
        .wait("Please wait while {0} is installed ...".format("Microsoft Visual C++ 2015 Redistributable (x86)"));

    var dlls = [
        "api-ms-win-crt-conio-l1-1-0.dll",
        "api-ms-win-crt-heap-l1-1-0.dll",
        "api-ms-win-crt-locale-l1-1-0.dll",
        "api-ms-win-crt-math-l1-1-0.dll",
        "api-ms-win-crt-runtime-l1-1-0.dll",
        "api-ms-win-crt-stdio-l1-1-0.dll",
        "atl140.dll",
        "msvcp140.dll",
        "msvcr140.dll",
        "ucrtbase.dll",
        "vcomp140.dll",
        "vcruntime140.dll"
    ];
    this.overrideDLL()
        .set("native, builtin", dlls)
        .do();

    return this;
};
