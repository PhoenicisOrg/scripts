include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["engines", "wine", "verbs", "luna"]);
include(["utils", "functions", "filesystem", "files"]);
include(["utils", "functions", "filesystem", "extract"]);
include(["engines", "wine", "plugins", "regsvr32"]);

/**
* Verb to install amstream
* @returns {Wine} Wine object
*/
Wine.prototype.amstream = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X64.exe")
        .checksum("74865ef2562006e51d7f9333b4a8d45b7a749dab")
        .name("windows6.1-KB976932-X64.exe")
        .get();
    this.wizard().wait(tr("Please wait while {0} is installed ...", "amstream"));
    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory() + "/drive_c/amstream/")
        .extract(["-L", "-F", "x86_microsoft-windows-directshow-other_31bf3856ad364e35_6.1.7601.17514_none_0f58f1e53efca91e"]);
    cp(this.prefixDirectory() + "/drive_c/amstream/x86_microsoft-windows-directshow-other_31bf3856ad364e35_6.1.7601.17514_none_0f58f1e53efca91e/amstream.dll", this.system32directory());
    this.regsvr32().install("amstream.dll");    
    if (this.architecture() == "amd64") {
       this.wizard().wait(tr("Please wait while {0} is installed ...", "amstream"));
       new CabExtract()
            .archive(setupFile)
            .to(this.prefixDirectory() + "/drive_c/amstream/")
            .extract(["-L", "-F", "amstream.dll"]);
       cp(this.prefixDirectory() + "/drive_c/amstream/amd64_microsoft-windows-directshow-other_31bf3856ad364e35_6.1.7601.17514_none_6b778d68f75a1a54/amstream.dll", this.system64directory());
       this.regsvr64().install("amstream.dll");
    }
    this.overrideDLL()
        .set("native,builtin", ["amstream"])
        .do();

    return this;
};
