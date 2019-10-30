const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");
const WindowsVersion = include("engines.wine.plugins.windows_version");
const Regedit = include("engines.wine.plugins.regedit");
const RemoveMono = include("engines.wine.verbs.remove_mono");
const DotNET462 = include("engines.wine.verbs.dotnet462");

/**
 * Verb to install .NET 4.7.2
 */
class DotNET472 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const windowsVersion = new WindowsVersion(this.wine).getWindowsVersion();

        print(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet472"));

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "https://download.microsoft.com/download/6/E/4/6E48E8AB-DC00-419E-9704-06DD46E5F81D/NDP472-KB4054530-x86-x64-AllOS-ENU.exe"
            )
            .checksum("31fc0d305a6f651c9e892c98eb10997ae885eb1e")
            .name("NDP472-KB4054530-x86-x64-AllOS-ENU.exe")
            .get();

        new RemoveMono(this.wine).go();

        new DotNET462(this.wine).go();

        new WindowsVersion(this.wine).withWindowsVersion("win7").go();

        new OverrideDLL(this.wine).withMode("builtin", ["fusion"]).go();

        wizard.wait(tr("Please wait while {0} is installed...", ".NET Framework 4.7.2"));

        this.wine.run(setupFile, [setupFile, "/sfxlang:1027", "/q", "/norestart"], null, false, true);

        wizard.wait(tr("Please wait..."));

        new Regedit(this.wine).deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*fusion");

        new OverrideDLL(this.wine).withMode("native", ["mscoree"]).go();

        new WindowsVersion(this.wine).withWindowsVersion(windowsVersion).go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "dotnet472", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        wizard.message(tr("This package ({0}) does not work currently. Use it only for testing!", "dotnet472"));

        new DotNET472(wine).go();

        wizard.close();
    }
}

module.default = DotNET472;
