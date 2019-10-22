const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { cp, remove } = include("utils.functions.filesystem.files");
const { CabExtract } = include("utils.functions.filesystem.extract");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");
const Regsvr32 = include("engines.wine.plugins.regsvr32");

/**
 * Verb to install amstream
 */
class Amstream {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const system32directory = this.wine.system32directory();
        const architecture = this.wine.architecture();

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X86.exe"
            )
            .checksum("c3516bc5c9e69fee6d9ac4f981f5b95977a8a2fa")
            .name("windows6.1-KB976932-X86.exe")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "amstream"));

        remove(`${system32directory}/amstream.dll`);

        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(system32directory)
            .extract([
                "-L",
                "-F",
                "x86_microsoft-windows-directshow-other_31bf3856ad364e35_6.1.7601.17514_none_0f58f1e53efca91e/amstream.dll"
            ]);

        cp(
            `${system32directory}/x86_microsoft-windows-directshow-other_31bf3856ad364e35_6.1.7601.17514_none_0f58f1e53efca91e/amstream.dll`,
            system32directory
        );

        new Regsvr32(this.wine).withDll("amstream.dll").go();

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

            wizard.wait(tr("Please wait while {0} is installed...", "amstream"));

            remove(`${system64directory}/amstream.dll`);

            new CabExtract()
                .wizard(wizard)
                .archive(setupFilex64)
                .to(system64directory)
                .extract([
                    "-L",
                    "-F",
                    "amd64_microsoft-windows-directshow-other_31bf3856ad364e35_6.1.7601.17514_none_6b778d68f75a1a54/amstream.dll"
                ]);
            cp(
                `${system64directory}/amd64_microsoft-windows-directshow-other_31bf3856ad364e35_6.1.7601.17514_none_6b778d68f75a1a54/amstream.dll`,
                system64directory
            );

            this.wine.regsvr64().install("amstream.dll");
        }

        new OverrideDLL(this.wine).withMode("native,builtin", ["amstream"]).go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "amstream", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Amstream(wine).go();

        wizard.close();
    }
}

module.default = Amstream;
