include("engines.wine.engine.object");
include("utils.functions.net.resource");

/**
 * Verb to install QuickTime 7.6
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.quicktime76 = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("http://appldnld.apple.com/QuickTime/041-0025.20101207.Ptrqt/QuickTimeInstaller.exe")
        .checksum("1eec8904f041d9e0ad3459788bdb690e45dbc38e")
        .name("QuickTimeInstaller.exe")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "QuickTime"));
    this.run(setupFile, ["ALLUSERS=1", "DESKTOP_SHORTCUTS=0", "QTTaskRunFlags=0", "QTINFO.BISQTPRO=1", "SCHEDULE_ASUW=0", "REBOOT_REQUIRED=No"], null, false, true);

    return this;
};

/**
 * Verb to install QuickTime 7.6
 */
// eslint-disable-next-line no-unused-vars
class QuickTime76Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "quicktime76", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.quicktime76();
        wizard.close();
    }
}
