include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);
include(["Engines", "Wine", "Verbs", "luna"]);
include(["Utils", "Functions", "Filesystem", "Files"]);
include(["Engines", "Wine", "Verbs", "dotnet40"]);

/**
* Inspired from dotnet40 verb, winetricks dotnet452 and POL4 POL_install_dotnet45
* -> https://github.com/Winetricks/winetricks/blob/63bc6dbe612d017a0cb6bf6e4cde265162d75bca/src/winetricks#L6938
* @returns {Wine}
*/
Wine.prototype.dotnet452 = function() {
    if (this.architecture() == "amd64") {
        throw "{0} cannot be installed in a 64bit wine prefix!".format("dotnet452");
    }
    
    var OSVersion = this.windowsVersion;

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
      
    this.windowsVersion(OSVersion);
    
    if(OSVersion != "win2003") {
     print(tr("{0} applications can have issues when windows version is not set to \"win2003\""), ".NET 4.5.2");
    }
    
    return this;
};
