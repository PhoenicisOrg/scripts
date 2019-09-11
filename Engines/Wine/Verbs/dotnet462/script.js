const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");
include("engines.wine.plugins.windows_version");
include("engines.wine.plugins.regedit");
const RemoveMono = include("engines.wine.verbs.remove_mono");
const DotNET461 = include("engines.wine.verbs.dotnet461");

/**
 * Verb to install .NET 4.6.2
 */
class DotNET462 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const windowsVersion = this.wine.windowsVersion();

        print(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet462"));

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "https://download.microsoft.com/download/F/9/4/F942F07D-F26F-4F30-B4E3-EBD54FABA377/NDP462-KB3151800-x86-x64-AllOS-ENU.exe"
            )
            .checksum("a70f856bda33d45ad0a8ad035f73092441715431")
            .name("NDP462-KB3151800-x86-x64-AllOS-ENU.exe")
            .get();

        new RemoveMono(this.wine).go();

        new DotNET461(this.wine).go();

        this.wine.windowsVersion("win7");

        this.wine
            .overrideDLL()
            .set("builtin", ["fusion"])
            .do();

        wizard.wait(tr("Please wait while {0} is installed...", ".NET Framework 4.6.2"));

        this.wine.run(setupFile, [setupFile, "/sfxlang:1027", "/q", "/norestart"], null, false, true);

        wizard.wait(tr("Please wait..."));

        this.wine.regedit().deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*fusion");

        this.wine
            .overrideDLL()
            .set("native", ["mscoree"])
            .do();

        this.wine.windowsVersion(windowsVersion);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "dotnet462", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        wizard.message(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet462"));

        new DotNET462(wine).go();

        wizard.close();
    }
}

module.default = DotNET462;
