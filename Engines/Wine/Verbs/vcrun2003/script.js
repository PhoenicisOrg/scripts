const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { cp } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

/**
 * Verb to install vcrun2003
 */
class Vcrun2003 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const programFiles = this.wine.programFiles();
        const system32directory = this.wine.system32directory();

        const setupFile = new Resource()
            .wizard(wizard)
            .url("https://sourceforge.net/projects/bzflag/files/bzedit%20win32/1.6.5/BZEditW32_1.6.5.exe")
            .checksum("bdd1b32c4202fd77e6513fd507c8236888b09121")
            .name("BZEditW32_1.6.5.exe")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2003 Redistributable (x86)"));

        this.wine.run(setupFile, "/S", null, false, true);

        ["msvcp71", "mfc71"].forEach(dll => {
            cp(`${programFiles}/BZEdit1.6.5/${dll}`, system32directory);
        });
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "vcrun2003", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Vcrun2003(wine).go();

        wizard.close();
    }
}

module.default = Vcrun2003;
