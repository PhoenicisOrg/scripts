const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { cp, remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");

/**
 * Verb to install secur32
 */
class Secur32 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();
        const architecture = this.wine.architecture();

        const setupFilex86 = new Resource()
            .wizard(wizard)
            .url(
                "https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X86.exe"
            )
            .checksum("c3516bc5c9e69fee6d9ac4f981f5b95977a8a2fa")
            .name("windows6.1-KB976932-X86.exe")
            .get();

        new CabExtract()
            .wizard(wizard)
            .archive(setupFilex86)
            .to(`${prefixDirectory}/TMP/`)
            .extract([
                "-L",
                "-F",
                "x86_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_a851f4adbb0d5141/secur32.dll"
            ]);

        cp(
            `${prefixDirectory}/TMP/x86_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_a851f4adbb0d5141/secur32.dll`,
            system32directory
        );

        remove(`${prefixDirectory}/TMP/`);

        if (architecture == "amd64") {
            const system64directory = this.wine.system64directory();

            const setupFilex64 = new Resource()
                .wizard(wizard)
                .url(
                    "https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X64.exe"
                )
                .checksum("74865ef2562006e51d7f9333b4a8d45b7a749dab")
                .name("windows6.1-KB976932-X64.exe")
                .get();

            new CabExtract()
                .wizard(wizard)
                .archive(setupFilex64)
                .to(`${prefixDirectory}/TMP/`)
                .extract([
                    "-L",
                    "-F",
                    "amd64_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_04709031736ac277/secur32.dll"
                ]);

            cp(
                `${prefixDirectory}/TMP/amd64_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_04709031736ac277/secur32.dll`,
                system64directory
            );

            remove(`${prefixDirectory}/TMP/`);
        }

        new OverrideDLL(this.wine).withMode("native, builtin", ["secur32"]).go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "secur32", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Secur32(wine).go();

        wizard.close();
    }
}

module.default = Secur32;
