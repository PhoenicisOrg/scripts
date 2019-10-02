const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { cp, remove } = include("utils.functions.filesystem.files");

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
        const architecture = this.wine.architecture();

        const setupFile = new Resource()
            .wizard(wizard)
            .url("https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X86.exe")
            .checksum("c3516bc5c9e69fee6d9ac4f981f5b95977a8a2fa")
            .name("windows6.1-KB976932-X86.exe")
            .get();

        new CabExtract()
            .archive(setupFile)
            .wizard(wizard)
            .to(`${prefixDirectory}/drive_c/gdiplus/`)
            .extract(["-L", "-F", "x86_microsoft.windows.gdiplus_6595b64144ccf1df_1.1.7601.17514_none_72d18a4386696c80/gdiplus.dll"]);

        cp(`${prefixDirectory}/drive_c/gdiplus/x86_microsoft.windows.gdiplus_6595b64144ccf1df_1.1.7601.17514_none_72d18a4386696c80/gdiplus.dll`, system32directory);

        if (architecture == "amd64") {
            const system64directory = this.wine.system64directory();

            const setupFile64 = new Resource()
                .wizard(wizard)
                .url("https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X64.exe")
                .checksum("74865ef2562006e51d7f9333b4a8d45b7a749dab")
                .name("windows6.1-KB976932-X64.exe")
                .get();

            new CabExtract()
                .archive(setupFile64)
                .wizard(wizard)
                .to(`${prefixDirectory}/drive_c/gdiplus/`)
                .extract(["-L", "-F", "amd64_microsoft.windows.gdiplus_6595b64144ccf1df_1.1.7601.17514_none_2b24536c71ed437a/gdiplus.dll"]);

            cp(`${prefixDirectory}/drive_c/gdiplus/amd64_microsoft.windows.gdiplus_6595b64144ccf1df_1.1.7601.17514_none_2b24536c71ed437a/gdiplus.dll`, system64directory);
        }

        remove(`${prefixDirectory}/drive_c/gdiplus/`);

        this.wine
            .overrideDLL()
            .set("native", ["gdiplus"])
            .do();
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
