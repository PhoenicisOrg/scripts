include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");

/**
 * Verb to install msxml6
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.msxml6 = function () {
    if (this.architecture() == "amd64") {
        var setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("https://download.microsoft.com/download/e/a/f/eafb8ee7-667d-4e30-bb39-4694b5b3006f/msxml6_x64.msi")
            .checksum("ca0c0814a9c7024583edb997296aad7cb0a3cbf7")
            .name("msxml6_x64.msi")
            .get();
    } else {
        var setupFile32 = new Resource()
            .wizard(this.wizard())
            .url("https://download.microsoft.com/download/e/a/f/eafb8ee7-667d-4e30-bb39-4694b5b3006f/msxml6_x86.msi")
            .checksum("5125220e985b33c946bbf9f60e2b222c7570bfa2")
            .name("msxml6_x86.msi")
            .get();
    }

    remove(this.system32directory() + "/msxml6.dll")
    this.overrideDLL()
        .set("native,builtin", ["msxml6"])
        .do();

    if (this.architecture() == "amd64") {
        remove(this.system64directory() + "/msxml6.dll")
        this.wizard().wait(tr("Please wait while {0} is installed...", "msxml6"));
        this.run(setupFile64, ["/q:a", "/c:msxml6_x64.msi /q"], null, false, true);
    } else {
        this.wizard().wait(tr("Please wait while {0} is installed...", "msxml6"));
        this.run(setupFile32, ["/q:a", "/c:msxml6_x86.msi /q"], null, false, true);
    }

    return this;
};

/**
 * Verb to install msxml6
 */
// eslint-disable-next-line no-unused-vars
class Msxml6Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "msxml6", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.msxml6();
        wizard.close();
    }
}
