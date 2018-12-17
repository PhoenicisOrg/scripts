include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["engines", "wine", "verbs", "luna"]);
include(["utils", "functions", "filesystem", "files"]);
include(["engines", "wine", "plugins", "windows_version"]);

/**
* Verb to install .NET 2.0
* @returns {Wine} Wine object
*/
Wine.prototype.dotnet20 = function () {
    if (this._architecture = "x86") {
        this.windowsVersion("win2k");
        var setupFile = new Resource()
            .wizard(this.wizard())
            .url("https://download.lenovo.com/ibmdl/pub/pc/pccbbs/thinkvantage_en/dotnetfx.exe")
            .checksum("a3625c59d7a2995fb60877b5f5324892a1693b2a")
            .name("dotnetfx.exe")
            .get();
    }
    else {
        var setupFile = new Resource()
            .wizard(this.wizard())
            .url("https://download.microsoft.com/download/a/3/f/a3f1bf98-18f3-4036-9b68-8e6de530ce0a/NetFx64.exe")
            .checksum("e59cca309463a5d98daeaada83d1b05fed5126c5")
            .name("NetFx64.exe")
            .get();
    }

    this.uninstall("Mono");

    this.wizard().wait(tr("Please wait while {0} is installed ...", ".NET Framework 2.0"));
    this.run(setupFile, [setupFile, "/q", "/c:\"install.exe /q\""], null, false, true);

    if (this._architecture = "x86"){
        remove(this.system32directory() + "/msvc" + "?" + "80.dll");
    }

    this.windowsVersion("win7");

    return this;
};
