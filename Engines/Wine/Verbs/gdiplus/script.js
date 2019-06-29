include("engines.wine.engine.object");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");
include("engines.wine.plugins.override_dll");

/**
 * Verb to install gdiplus
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.gdiplus = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("http://download.microsoft.com/download/a/b/c/abc45517-97a0-4cee-a362-1957be2f24e1/WindowsXP-KB975337-x86-ENU.exe")
        .checksum("b9a84bc3de92863bba1f5eb1d598446567fbc646")
        .name("WindowsXP-KB975337-x86-ENU.exe")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "GDI+"));
    this.run(setupFile, ["/extract:C:\\Tmp", "/q"], null, true, true);

    this.overrideDLL()
        .set("native", ["gdiplus"])
        .do();

    cp(this.prefixDirectory() + "/drive_c/Tmp/asms/10/msft/windows/gdiplus/gdiplus.dll", this.system32directory());

    return this;
};

/**
 * Verb to install gdiplus
 */
// eslint-disable-next-line no-unused-vars
class GdiplusVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "gdiplus", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.gdiplus();
        wizard.close();
    }
}
