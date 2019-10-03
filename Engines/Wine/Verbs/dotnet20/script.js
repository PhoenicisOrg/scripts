const Wine = include("engines.wine.engine.object");

const Resource = include("utils.functions.net.resource");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

const WindowsVersion = include("engines.wine.plugins.windows_version");
const RemoveMono = include("engines.wine.verbs.remove_mono");

/**
 * Verb to install .NET 2.0
 */
class DotNET20 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const windowsVersion = new WindowsVersion(this.wine).getWindowsVersion();

        const system32directory = this.wine.system32directory();

        if (this.wine.architecture() == "x86") {
            new WindowsVersion(this.wine).withWindowsVersion("win2k").go();

            const setupFile32 = new Resource()
                .wizard(wizard)
                .url("https://download.lenovo.com/ibmdl/pub/pc/pccbbs/thinkvantage_en/dotnetfx.exe")
                .checksum("a3625c59d7a2995fb60877b5f5324892a1693b2a")
                .name("dotnetfx.exe")
                .get();

            new RemoveMono(this.wine).go();

            wizard.wait(tr("Please wait while {0} is installed...", ".NET Framework 2.0"));

            this.wine.run(setupFile32, ["/q:a", "/c:install.exe /q"], null, false, true);

            new WindowsVersion(this.wine).withWindowsVersion(windowsVersion).go();

            remove(`${system32directory}/msvcr80.dll`);
            remove(`${system32directory}/msvcm80.dll`);
            remove(`${system32directory}/msvcp80.dll`);
        } else {
            const setupFile64 = new Resource()
                .wizard(wizard)
                .url("https://download.microsoft.com/download/a/3/f/a3f1bf98-18f3-4036-9b68-8e6de530ce0a/NetFx64.exe")
                .checksum("e59cca309463a5d98daeaada83d1b05fed5126c5")
                .name("NetFx64.exe")
                .get();

            new RemoveMono(this.wine).go();

            wizard.wait(tr("Please wait while {0} is installed...", ".NET Framework 2.0"));

            this.wine.run(setupFile64, ["/q:a", "/c:install.exe /q"], null, false, true);
        }

        //This is in winetricks source, but does not seem to work
        //this.wizard().wait(tr("Please wait while executing ngen..."));
        //this.run(this.prefixDirectory() + "/drive_c/windows/Microsoft.NET/Framework/v2.0.50727/ngen.exe", "executequeueditems", null, false, true);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "dotnet20", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new DotNET20(wine).go();

        wizard.close();
    }
}

module.default = DotNET20;
