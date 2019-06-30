include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.remove_mono");
include("engines.wine.plugins.regedit");
include("engines.wine.verbs.dotnet46");


/**
 * Verb to install .NET 4.6.1
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.dotnet461 = function () {
    print(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet461"));

    var osVersion = this.windowsVersion();

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("https://download.microsoft.com/download/E/4/1/E4173890-A24A-4936-9FC9-AF930FE3FA40/NDP461-KB3102436-x86-x64-AllOS-ENU.exe")
        .checksum("83d048d171ff44a3cad9b422137656f585295866")
        .name("NDP461-KB3102436-x86-x64-AllOS-ENU.exe")
        .get();

    this.removeMono();

    this.dotnet46();
    this.windowsVersion("win7");

    this.overrideDLL()
        .set("builtin", ["fusion"])
        .do();

    this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 4.6.1"));
    this.run(setupFile, [setupFile, "/q", "/norestart"], null, false, true);

    this.wizard().wait(tr("Please wait..."));
    this.regedit().deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*fusion");

    this.overrideDLL()
        .set("native", ["mscoree"])
        .do();

    this.windowsVersion(osVersion);

    return this;
};

/**
 * Verb to install .NET 4.6.1
 */
// eslint-disable-next-line no-unused-vars
class Dotnet461Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "dotnet461", java.util.Optional.empty());
        wizard.message(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet461"));
        wine.wizard(wizard);
        wine.dotnet461();
        wizard.close();
    }
}
