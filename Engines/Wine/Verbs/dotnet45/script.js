include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);
include(["Engines", "Wine", "Verbs", "luna"]);
include(["Utils", "Functions", "Filesystem", "Files"]);
include(["Engines", "Wine", "Verbs", "dotnet40"]);

/**
* Inspired from winetricks dotnet45 and POL4 POL_install_dotnet45
* -> https://github.com/Winetricks/winetricks/blob/63bc6dbe612d017a0cb6bf6e4cde265162d75bca/src/winetricks#L8523
* @returns {Wine}
*/
Wine.prototype.dotnet45 = function() {
    
    if (this.architecture() == "amd64") {
        throw "{0} cannot be installed in a 64bit wine prefix!".format("dotnet45");
    }

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://download.microsoft.com/download/b/a/4/ba4a7e71-2906-4b2d-a0e1-80cf16844f5f/dotnetfx45_full_x86_x64.exe")
        .checksum("b2ff712ca0947040ca0b8e9bd7436a3c3524bb5d")
        .name("dotnetfx45_full_x86_x64.exe")
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
        .wait(tr("Please wait while {0} is installed ...", ".NET Framework 4.5"));

    this.overrideDLL()
        .set("native", ["mscoree"])
        .do();
        
    this.windowsVersion("win2003");

    return this;
}; 
