include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.remove_mono");
include("engines.wine.plugins.regedit");
include("engines.wine.verbs.dotnet45");

/**
* Verb to install .NET 4.6
* @returns {Wine} Wine object
*/
Wine.prototype.dotnet46 = function () {
    print(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet46"));

    var osVersion = this.windowsVersion();

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("https://download.microsoft.com/download/C/3/A/C3A5200B-D33C-47E9-9D70-2F7C65DAAD94/NDP46-KB3045557-x86-x64-AllOS-ENU.exe")
        .checksum("3049a85843eaf65e89e2336d5fe6e85e416797be")
        .name("NDP46-KB3045557-x86-x64-AllOS-ENU.exe")
        .get();

    this.removeMono();

    this.dotnet45();
    this.windowsVersion("win7");

    this.overrideDLL()
        .set("builtin", ["fusion"])
        .do();

    this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 4.6"));
    this.run(setupFile, [setupFile, "/q", "/c:\"install.exe /q\""], null, false, true);

    this.wizard().wait(tr("Please wait..."));
    this.regedit().deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*fusion");

    this.overrideDLL()
        .set("native", ["mscoree"])
        .do();

    this.windowsVersion(osVersion);

    return this;
};

/**
 * Verb to install .NET 4.6
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "dotnet46", java.util.Optional.empty());
        wizard.message(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet46"));
        wine.wizard(wizard);
        wine.dotnet46();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
