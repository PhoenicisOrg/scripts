include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.remove_mono");
include("engines.wine.plugins.regedit");
include("engines.wine.verbs.dotnet40");


/**
* Verb to install .NET 4.5.2
* @returns {Wine} Wine object
*/
Wine.prototype.dotnet452 = function () {
    print(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet452"));

    var osVersion = this.windowsVersion();

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://download.microsoft.com/download/E/2/1/E21644B5-2DF2-47C2-91BD-63C560427900/NDP452-KB2901907-x86-x64-AllOS-ENU.exe")
        .checksum("89f86f9522dc7a8a965facce839abb790a285a63")
        .name("NDP452-KB2901907-x86-x64-AllOS-ENU.exe")
        .get();

    this.removeMono();

    this.dotnet40();
    this.windowsVersion("win7");

    this.overrideDLL()
        .set("builtin", ["fusion"])
        .do();

    this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 4.5.2"));
    this.run(setupFile, [setupFile, "/q", "/c:\"install.exe /q\""], null, false, true);

    this.wizard().wait(tr("Please wait..."));
    this.regedit().deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*fusion");

    this.overrideDLL()
        .set("native", ["mscoree"])
        .do();

    this.windowsVersion(osVersion);

    if (osVersion != "win2003") {
        print(tr("{0} applications can have issues when windows version is not set to \"win2003\"", ".NET 4.5.2"));
    }

    return this;
};

/**
 * Verb to install .NET 4.5.2
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "dotnet452", java.util.Optional.empty());
        wizard.message(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet452"));
        wine.wizard(wizard);
        wine.dotnet452();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
