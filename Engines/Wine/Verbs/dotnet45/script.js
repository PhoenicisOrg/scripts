include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("engines.wine.plugins.windows_version");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");
include("utils.functions.filesystem.files");
include("engines.wine.verbs.dotnet40");

/**
* Verb to install .NET 4.5
* @returns {Wine} Wine object
*/
Wine.prototype.dotnet45 = function () {

    if (this.architecture() == "amd64") {
        throw "{0} cannot be installed in a 64bit wine prefix!".format("dotnet45");
    }

    var OSVersion = this.windowsVersion();

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("http://download.microsoft.com/download/b/a/4/ba4a7e71-2906-4b2d-a0e1-80cf16844f5f/dotnetfx45_full_x86_x64.exe")
        .checksum("b2ff712ca0947040ca0b8e9bd7436a3c3524bb5d")
        .name("dotnetfx45_full_x86_x64.exe")
        .get();

    this.uninstall("Mono");

    this.wizard().wait(tr("Please wait..."));
    this.run("reg", ["delete", "HKLM\Software\Microsoft\NET Framework Setup\NDP\v4", "/f"], null, false, true);

    remove(this.system32directory() + "/mscoree.dll");

    this.dotnet40();
    this.windowsVersion("win7");

    this.overrideDLL()
        .set("builtin", ["fusion"])
        .do();

    this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 4.5"));
    this.run(setupFile, [setupFile, "/q", "/c:\"install.exe /q\""], null, false, true);

    this.overrideDLL()
        .set("native", ["mscoree"])
        .do();

    this.windowsVersion(OSVersion);

    if (OSVersion != "win2003") {
        print(tr("{0} applications can have issues when windows version is not set to \"win2003\"", ".NET 4.5"));
    }

    return this;
};

/**
 * Verb to install .NET 4.5
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "dotnet45", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.dotnet45();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);

