const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");
include("engines.wine.plugins.windows_version");
include("engines.wine.plugins.regedit");
const RemoveMono = include("engines.wine.verbs.remove_mono");
const DotNET45 = include("engines.wine.verbs.dotnet45");

/**
 * Verb to install .NET 4.6
 */
class DotNET46 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const windowsVersion = this.wine.windowsVersion();

        print(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet46"));

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "https://download.microsoft.com/download/C/3/A/C3A5200B-D33C-47E9-9D70-2F7C65DAAD94/NDP46-KB3045557-x86-x64-AllOS-ENU.exe"
            )
            .checksum("3049a85843eaf65e89e2336d5fe6e85e416797be")
            .name("NDP46-KB3045557-x86-x64-AllOS-ENU.exe")
            .get();

        new RemoveMono(this.wine).go();

        new DotNET45(this.wine).go();

        this.wine.windowsVersion("win7");

        this.wine
            .overrideDLL()
            .set("builtin", ["fusion"])
            .do();

        wizard.wait(tr("Please wait while {0} is installed...", ".NET Framework 4.6"));

        this.wine.run(setupFile, [setupFile, "/q", '/c:"install.exe /q"'], null, false, true);

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
        const wizard = SetupWizard(InstallationType.VERBS, "dotnet46", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        wizard.message(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet46"));

        new DotNET46(wine).go();

        wizard.close();
    }
}

module.default = DotNET46;
