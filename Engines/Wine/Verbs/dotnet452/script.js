include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);
include(["Engines", "Wine", "Verbs", "luna"]);
include(["Utils", "Functions", "Filesystem", "Files"]);
include(["Engines", "Wine", "Verbs", "dotnet40"]);

Wine.prototype.dotnet452 = function() {
    //Inspired from winetricks mspatcha, and from POL4 POL_install_dotnet45
    if (this.architecture() == "amd64") {
        throw "{0} cannot be installed in a 64bit wine prefix!".format("dotnet452");
    }

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("https://download.microsoft.com/download/E/2/1/E21644B5-2DF2-47C2-91BD-63C560427900/NDP452-KB2901907-x86-x64-AllOS-ENU.exe")
        .checksum("89f86f9522dc7a8a965facce839abb790a285a63")
        .name("NDP452-KB2901907-x86-x64-AllOS-ENU.exe")
        .get();

    this.uninstall("Mono");
    
    this.run("reg", ["delete", "HKLM\Software\Microsoft\NET Framework Setup\NDP\v4", "/f"])
        .wait(tr("Please wait ..."));

    remove(this.system32directory() + "/mscoree.dll");
    
    this.dotnet40();
    this.windowsVersion("win7");

    this.overrideDLL()
        .set("builtin", ["fusion"])
        .do();

    this.run(setupFile, [setupFile, "/q", "/c:\"install.exe /q\""])
        .wait(tr("Please wait while {0} is installed ...", ".NET Framework 4.5.2"));

    this.overrideDLL()
        .set("native", ["mscoree"])
        .do();
        
    this.windowsVersion("win2003");

    return this;
};
