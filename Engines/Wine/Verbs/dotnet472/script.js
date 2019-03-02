include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.remove_mono");
include("engines.wine.plugins.regedit");
include("engines.wine.verbs.dotnet462");


/**
* Verb to install .NET 4.7.2
* @returns {Wine} Wine object
*/
Wine.prototype.dotnet472 = function () {
    print(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet472"));

    var osVersion = this.windowsVersion();

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("https://download.microsoft.com/download/6/E/4/6E48E8AB-DC00-419E-9704-06DD46E5F81D/NDP472-KB4054530-x86-x64-AllOS-ENU.exe")
        .checksum("31fc0d305a6f651c9e892c98eb10997ae885eb1e")
        .name("NDP472-KB4054530-x86-x64-AllOS-ENU.exe")
        .get();

    this.removeMono();

    this.dotnet462();
    this.windowsVersion("win7");

    this.overrideDLL()
        .set("builtin", ["fusion"])
        .do();

    this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 4.7.2"));
    this.run(setupFile, [setupFile, "/sfxlang:1027", "/q", "/norestart"], null, false, true);

    this.wizard().wait(tr("Please wait..."));
    this.regedit().deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*fusion");

    this.overrideDLL()
        .set("native", ["mscoree"])
        .do();

    this.windowsVersion(osVersion);

    return this;
};

/**
 * Verb to install .NET 4.7.2
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "dotnet472", java.util.Optional.empty());
        wizard.message(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet472"));
        wine.wizard(wizard);
        wine.dotnet472();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
