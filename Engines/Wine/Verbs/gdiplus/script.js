const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { cp } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install gdiplus
 */
class GDIPlus {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "http://download.microsoft.com/download/a/b/c/abc45517-97a0-4cee-a362-1957be2f24e1/WindowsXP-KB975337-x86-ENU.exe"
            )
            .checksum("b9a84bc3de92863bba1f5eb1d598446567fbc646")
            .name("WindowsXP-KB975337-x86-ENU.exe")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "GDI+"));

        this.wine.run(setupFile, ["/extract:C:\\Tmp", "/q"], null, true, true);

        this.wine
            .overrideDLL()
            .set("native", ["gdiplus"])
            .do();

        cp(`${prefixDirectory}/drive_c/Tmp/asms/10/msft/windows/gdiplus/gdiplus.dll`, system32directory);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "gdiplus", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new GDIPlus(wine).go();

        wizard.close();
    }
}

module.default = GDIPlus;
