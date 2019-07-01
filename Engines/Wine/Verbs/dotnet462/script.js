include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.remove_mono");
include("engines.wine.plugins.regedit");
include("engines.wine.verbs.dotnet461");


/**
 * Verb to install .NET 4.6.2
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.dotnet462 = function () {
    print(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet462"));

    var osVersion = this.windowsVersion();

    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("https://download.microsoft.com/download/F/9/4/F942F07D-F26F-4F30-B4E3-EBD54FABA377/NDP462-KB3151800-x86-x64-AllOS-ENU.exe")
        .checksum("a70f856bda33d45ad0a8ad035f73092441715431")
        .name("NDP462-KB3151800-x86-x64-AllOS-ENU.exe")
        .get();

    this.removeMono();

    this.dotnet461();
    this.windowsVersion("win7");

    this.overrideDLL()
        .set("builtin", ["fusion"])
        .do();

    this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 4.6.2"));
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
 * Verb to install .NET 4.6.2
 */
// eslint-disable-next-line no-unused-vars
class Dotnet462Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "dotnet462", java.util.Optional.empty());
        wizard.message(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet462"));
        wine.wizard(wizard);
        wine.dotnet462();
        wizard.close();
    }
}
