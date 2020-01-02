const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

/**
 * Verb to install QuickTime 7.6
 */
class QuickTime76 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const setupFile = new Resource()
            .wizard(wizard)
            .url("http://appldnld.apple.com/QuickTime/041-0025.20101207.Ptrqt/QuickTimeInstaller.exe")
            .checksum("1eec8904f041d9e0ad3459788bdb690e45dbc38e")
            .name("QuickTimeInstaller.exe")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "QuickTime"));

        this.wine.run(
            setupFile,
            [
                "ALLUSERS=1",
                "DESKTOP_SHORTCUTS=0",
                "QTTaskRunFlags=0",
                "QTINFO.BISQTPRO=1",
                "SCHEDULE_ASUW=0",
                "REBOOT_REQUIRED=No"
            ],
            null,
            false,
            true
        );
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "quicktime76", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new QuickTime76(wine).go();

        wizard.close();
    }
}

module.default = QuickTime76;
