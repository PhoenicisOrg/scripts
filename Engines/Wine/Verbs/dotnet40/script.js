include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);
include(["Engines", "Wine", "Verbs", "luna"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

Wine.prototype.dotnet40 = function() {
    if (this.architecture() == "amd64") {
        throw "{0} cannot be installed in a 64bit wine prefix!".format("dotnet40");
    }

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("http://download.microsoft.com/download/9/5/A/95A9616B-7A37-4AF6-BC36-D6EA96C8DAAE/dotNetFx40_Full_x86_x64.exe")
        .checksum("58da3d74db353aad03588cbb5cea8234166d8b99")
        .name("dotNetFx40_Full_x86_x64.exe")
        .get();

    this.uninstall("Mono");

    this.run("reg", ["delete", "HKLM\Software\Microsoft\NET Framework Setup\NDP\v4", "/f"])
        .wait(tr("Please wait ..."));

    remove(this.system32directory() + "/mscoree.dll");

    this.overrideDLL()
        .set("builtin", ["fusion"])
        .do();

    this.run(setupFile, [setupFile, "/q", "/c:\"install.exe /q\""])
        .wait(tr("Please wait while {0} is installed ...", ".NET Framework 4.0"));

    this.overrideDLL()
        .set("native", ["mscoree"])
        .do();

    this.run("reg", ["add", "HKLM\Software\Microsoft\NET Framework Setup\NDP\v4\Full", "/v", "Install", "/t", "REG_DWORD", "/d", "0001", "/f"])
        .wait(tr("Please wait ..."));
    this.run("reg", ["add", "HKLM\Software\Microsoft\NET Framework Setup\NDP\v4\Full", "/v", "Version", "/t", "REG_SZ", "/d", "4.0.30319", "/f"])
        .wait(tr("Please wait ..."));

    return this;
};
