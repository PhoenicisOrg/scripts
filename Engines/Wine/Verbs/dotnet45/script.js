const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");
include("engines.wine.plugins.windows_version");
include("engines.wine.plugins.regedit");
const RemoveMono = include("engines.wine.verbs.remove_mono");
const DotNET40 = include("engines.wine.verbs.dotnet40");

/**
 * Verb to install .NET 4.5
 */
class DotNET45 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const windowsVersion = this.wine.windowsVersion();

        if (this.architecture() == "amd64") {
            print(
                tr(
                    "This package ({0}) may not fully work on a 64-bit installation. 32-bit prefixes may work better.",
                    "dotnet45"
                )
            );
        }

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "http://download.microsoft.com/download/b/a/4/ba4a7e71-2906-4b2d-a0e1-80cf16844f5f/dotnetfx45_full_x86_x64.exe"
            )
            .checksum("b2ff712ca0947040ca0b8e9bd7436a3c3524bb5d")
            .name("dotnetfx45_full_x86_x64.exe")
            .get();

        new RemoveMono(this.wine).go();

        new DotNET40(this.wine).go();

        this.wine.windowsVersion("win7");

        this.wine
            .overrideDLL()
            .set("builtin", ["fusion"])
            .do();

        wizard.wait(tr("Please wait while {0} is installed...", ".NET Framework 4.5"));

        this.wine.run(setupFile, [setupFile, "/q", '/c:"install.exe /q"'], null, false, true);

        wizard.wait(tr("Please wait..."));

        this.wine.regedit().deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*fusion");

        this.wine
            .overrideDLL()
            .set("native", ["mscoree"])
            .do();

        this.wine.windowsVersion(windowsVersion);

        if (windowsVersion != "win2003") {
            print(tr('{0} applications can have issues when windows version is not set to "win2003"', ".NET 4.5"));
        }
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "dotnet45", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        if (wine.architecture() == "amd64") {
            wizard.message(
                tr(
                    "This package ({0}) may not fully work on a 64-bit installation. 32-bit prefixes may work better.",
                    "dotnet45"
                )
            );
        }

        new DotNET45(wine).go();

        wizard.close();
    }
}

module.default = DotNET45;
