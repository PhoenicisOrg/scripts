include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.remove_mono");


/**
* Verb to install .NET 2.0
* @returns {Wine} Wine object
*/
Wine.prototype.dotnet20 = function () {
    var osVersion = this.windowsVersion();

    if (this.architecture() == "x86") {
        this.windowsVersion("win2k");

        var setupFile32 = new Resource()
            .wizard(this.wizard())
            .url("https://download.lenovo.com/ibmdl/pub/pc/pccbbs/thinkvantage_en/dotnetfx.exe")
            .checksum("a3625c59d7a2995fb60877b5f5324892a1693b2a")
            .name("dotnetfx.exe")
            .get();

        this.removeMono();

        this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 2.0"));
        this.run(setupFile32, ["/q:a", "/c:install.exe /q"], null, false, true);

        this.windowsVersion(osVersion);

        remove(this.system32directory() + "/msvcr80.dll");
        remove(this.system32directory() + "/msvcm80.dll");
        remove(this.system32directory() + "/msvcp80.dll");
    }
    else {
        var setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("https://download.microsoft.com/download/a/3/f/a3f1bf98-18f3-4036-9b68-8e6de530ce0a/NetFx64.exe")
            .checksum("e59cca309463a5d98daeaada83d1b05fed5126c5")
            .name("NetFx64.exe")
            .get();

        this.removeMono();

        this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 2.0"));
        this.run(setupFile64, ["/q:a", "/c:install.exe /q"], null, false, true)
    }

    //This is in winetricks source, but does not seem to work
    //this.wizard().wait(tr("Please wait while executing ngen..."));
    //this.run(this.prefixDirectory() + "/drive_c/windows/Microsoft.NET/Framework/v2.0.50727/ngen.exe", "executequeueditems", null, false, true);

    return this;
};
