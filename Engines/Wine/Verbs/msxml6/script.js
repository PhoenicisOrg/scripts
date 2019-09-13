const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install msxml6
 */
class Msxml6 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const system32directory = this.wine.system32directory();
        const system64directory = this.wine.system64directory();

        remove(`${system32directory}/msxml6.dll`);

        this.wine
            .overrideDLL()
            .set("native,builtin", ["msxml6"])
            .do();

        if (this.wine.architecture() == "amd64") {
            remove(`${system64directory}/msxml6.dll`);

            const setupFile64 = new Resource()
                .wizard(wizard)
                .url(
                    "https://download.microsoft.com/download/e/a/f/eafb8ee7-667d-4e30-bb39-4694b5b3006f/msxml6_x64.msi"
                )
                .checksum("ca0c0814a9c7024583edb997296aad7cb0a3cbf7")
                .name("msxml6_x64.msi")
                .get();

            wizard.wait(tr("Please wait while {0} is installed...", "msxml6"));

            this.run(setupFile64, ["/q:a", "/c:msxml6_x64.msi /q"], null, false, true);
        } else {
            const setupFile32 = new Resource()
                .wizard(wizard)
                .url(
                    "https://download.microsoft.com/download/e/a/f/eafb8ee7-667d-4e30-bb39-4694b5b3006f/msxml6_x86.msi"
                )
                .checksum("5125220e985b33c946bbf9f60e2b222c7570bfa2")
                .name("msxml6_x86.msi")
                .get();

            wizard.wait(tr("Please wait while {0} is installed...", "msxml6"));

            this.run(setupFile32, ["/q:a", "/c:msxml6_x86.msi /q"], null, false, true);
        }
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "msxml6", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Msxml6(wine).go();

        wizard.close();
    }
}

module.default = Msxml6;
