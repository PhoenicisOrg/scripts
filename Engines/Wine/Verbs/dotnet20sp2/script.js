include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");
include("engines.wine.plugins.windows_version");
include("engines.wine.verbs.remove_mono");
include("engines.wine.plugins.regedit");



/**
 * Verb to install .NET 2.0 SP2
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.dotnet20sp2 = function () {
    var osVersion = this.windowsVersion();
    this.windowsVersion("winxp");
    var dlls = [
        "ngen.exe",
        "regsvcs.exe",
        "mscorsvw.exe"];
    this.overrideDLL()
        .set("builtin", dlls)
        .do();
    this.removeMono();

    if (this.architecture() == "x86") {

        var setupFile32 = new Resource()
            .wizard(this.wizard())
            .url("https://download.microsoft.com/download/c/6/e/c6e88215-0178-4c6c-b5f3-158ff77b1f38/NetFx20SP2_x86.exe")
            .checksum("22d776d4d204863105a5db99e8b8888be23c61a7")
            .name("NetFx20SP2_x86.exe")
            .get();


        this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 2.0 SP2"));
        this.run(setupFile32, [setupFile32, "/q", "/c:\"install.exe /q\""], null, false, true);


        remove(this.system32directory() + "/msvcr80.dll");
        remove(this.system32directory() + "/msvcm80.dll");
        remove(this.system32directory() + "/msvcp80.dll");
    }
    else {
        var setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("https://download.microsoft.com/download/c/6/e/c6e88215-0178-4c6c-b5f3-158ff77b1f38/NetFx20SP2_x64.exe")
            .checksum("a7cc6c6e5a4ad9cdf3df16a7d277eb09fec429b7")
            .name("NetFx20SP2_x64.exe")
            .get();


        this.wizard().wait(tr("Please wait while {0} is installed...", ".NET Framework 2.0 SP2"));
        this.run(setupFile64, [setupFile64, "/q", "/c:\"install.exe /q\""], null, false, true);
    }
    this.windowsVersion(osVersion);
    this.regedit().deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*ngen.exe");
    this.regedit().deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*regsvcs.exe");
    this.regedit().deleteValue("HKCU\\Software\\Wine\\DllOverrides", "*mscorsvw.exe");
    return this;
};

/**
 * Verb to install dotnet20sp2
 */
// eslint-disable-next-line no-unused-vars
class Dotnet20SP2Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "dotnet20sp2", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.dotnet20sp2();
        wizard.close();
    }
}
