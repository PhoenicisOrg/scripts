const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");
const WindowsVersion = include("engines.wine.plugins.windows_version");
const Regedit = include("engines.wine.plugins.regedit");
const RemoveMono = include("engines.wine.verbs.remove_mono");

/**
 * Verb to install .NET 4.0
 */
class DotNET40 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const windowsVersion = new WindowsVersion(this.wine).getWindowsVersion();

        if (this.wine.architecture() == "amd64") {
            print(
                tr(
                    "This package ({0}) may not fully work on a 64-bit installation. 32-bit prefixes may work better.",
                    "dotnet40"
                )
            );
        }

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "http://download.microsoft.com/download/9/5/A/95A9616B-7A37-4AF6-BC36-D6EA96C8DAAE/dotNetFx40_Full_x86_x64.exe"
            )
            .checksum("58da3d74db353aad03588cbb5cea8234166d8b99")
            .name("dotNetFx40_Full_x86_x64.exe")
            .get();

        new RemoveMono(this.wine).go();

        new WindowsVersion(this.wine).withWindowsVersion("winxp").go();

        new OverrideDLL(this.wine).withMode("builtin", ["fusion"]).go();

        wizard.wait(tr("Please wait while {0} is installed...", ".NET Framework 4.0"));

        this.wine.run(setupFile, [setupFile, "/q", '/c:"install.exe /q"'], null, false, true);

        wizard.wait(tr("Please wait..."));

        new Regedit(this.wine).deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*fusion");

        new OverrideDLL(this.wine).withMode("native", ["mscoree"]).go();

        wizard.wait(tr("Please wait..."));

        const regeditFileContent =
            "REGEDIT4\n" +
            "\n" +
            "[HKEY_LOCAL_MACHINE\\Software\\Microsoft\\NET Framework Setup\\NDP\\v4\\Full]\n" +
            '"Install"=dword:0001\n' +
            '"Version"="4.0.30319"';

        new Regedit(this.wine).patch(regeditFileContent);

        //This is in winetricks source, but does not seem to work
        //this.wizard().wait(tr("Please wait while executing ngen..."));
        //this.run(this.prefixDirectory() + "/drive_c/windows/Microsoft.NET/Framework/v4.0.30319/ngen.exe", "executequeueditems", null, false, true);

        new WindowsVersion(this.wine).withWindowsVersion(windowsVersion).go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "dotnet40", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        if (wine.architecture() == "amd64") {
            wizard.message(
                tr(
                    "This package ({0}) may not fully work on a 64-bit installation. 32-bit prefixes may work better.",
                    "dotnet40"
                )
            );
        }

        new DotNET40(wine).go();

        wizard.close();
    }
}

module.default = DotNET40;
