include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "net", "resource"]);
include(["engines", "wine", "verbs", "luna"]);
include(["utils", "functions", "filesystem", "files"]);
include(["engines", "wine", "verbs", "dotnet461"]);

/**
* Verb to install .NET 4.6.2
* @returns {Wine} Wine object
*/
Wine.prototype.dotnet462 = function () {
    if (this.architecture = "amd64") {
        print(tr("This package ({0}) may not fully work on a 64-bit installation. 32-bit prefixes may work better.", "dotnet462"));
    }

    var OSVersion = this.windowsVersion();
    if (OSVersion == null)
        OSVersion = "win7";

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("https://download.microsoft.com/download/F/9/4/F942F07D-F26F-4F30-B4E3-EBD54FABA377/NDP462-KB3151800-x86-x64-AllOS-ENU.exe")
        .checksum("a70f856bda33d45ad0a8ad035f73092441715431")
        .name("NDP462-KB3151800-x86-x64-AllOS-ENU.exe")
        .get();

    this.uninstall("Mono");

    this.dotnet461();
    this.windowsVersion("win7");

    this.overrideDLL()
        .set("builtin", ["fusion"])
        .do();

    this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 4.6.2"));
    this.run(setupFile, [setupFile, "/q", "/c:\"install.exe /q\""], null, false, true);

    this.wizard().wait(tr("Please wait ..."));
    this.run("reg", ["delete", "HKCU\\Software\\Wine\\DllOverrides\\fusion", "/f"], null, false, true);

    this.overrideDLL()
        .set("native", ["mscoree"])
        .do();

    this.windowsVersion(OSVersion);

    return this;
};

/**
 * Verb to install dotnet462
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "dotnet462", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.dotnet462();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
