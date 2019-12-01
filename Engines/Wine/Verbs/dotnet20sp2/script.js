const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");
const WindowsVersion = include("engines.wine.plugins.windows_version");
const Regedit = include("engines.wine.plugins.regedit");
const RemoveMono = include("engines.wine.verbs.remove_mono");

/**
 * Verb to install dotnet20sp2
 */
class DotNET20SP2 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const system32directory = this.wine.system32directory();

        const osVersion = new WindowsVersion(this.wine).getWindowsVersion();

        new WindowsVersion(this.wine).withWindowsVersion("winxp").go();

        new OverrideDLL(this.wine).withMode("builtin", ["ngen.exe", "regsvcs.exe", "mscorsvw.exe"]).go();

        new RemoveMono(this.wine).go();

        if (this.wine.architecture() == "x86") {
            const setupFile32 = new Resource()
                .wizard(wizard)
                .url(
                    "https://download.microsoft.com/download/c/6/e/c6e88215-0178-4c6c-b5f3-158ff77b1f38/NetFx20SP2_x86.exe"
                )
                .checksum("22d776d4d204863105a5db99e8b8888be23c61a7")
                .name("NetFx20SP2_x86.exe")
                .get();

            wizard.wait(tr("Please wait while {0} is installed...", ".NET Framework 2.0 SP2"));

            this.wine.run(setupFile32, [setupFile32, "/q", '/c:"install.exe /q"'], null, false, true);

            remove(`${system32directory}/msvcr80.dll`);
            remove(`${system32directory}/msvcm80.dll`);
            remove(`${system32directory}/msvcp80.dll`);
        } else {
            const setupFile64 = new Resource()
                .wizard(wizard)
                .url(
                    "https://download.microsoft.com/download/c/6/e/c6e88215-0178-4c6c-b5f3-158ff77b1f38/NetFx20SP2_x64.exe"
                )
                .checksum("a7cc6c6e5a4ad9cdf3df16a7d277eb09fec429b7")
                .name("NetFx20SP2_x64.exe")
                .get();

            wizard.wait(tr("Please wait while {0} is installed...", ".NET Framework 2.0 SP2"));

            this.wine.run(setupFile64, [setupFile64, "/q", '/c:"install.exe /q"'], null, false, true);
        }

        new WindowsVersion(this.wine).withWindowsVersion(osVersion).go();

        new Regedit(this.wine).deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*ngen.exe");
        new Regedit(this.wine).deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*regsvcs.exe");
        new Regedit(this.wine).deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*mscorsvw.exe");
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "dotnet20sp2", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new DotNET20SP2(wine).go();

        wizard.close();
    }
}

module.default = DotNET20SP2;
