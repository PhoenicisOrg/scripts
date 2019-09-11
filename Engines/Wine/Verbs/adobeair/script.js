const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.windows_version");

/**
 * Verb to install adobeair
 */
class AdobeAir {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        // Using Windows XP to workaround the wine bug 43506
        // See https://bugs.winehq.org/show_bug.cgi?id=43506
        const currentWindowsVersion = this.wine.windowsVersion();

        this.wine.windowsVersion("winxp");

        const adobeair = new Resource()
            .wizard(this.wizard())
            .url("https://airdownload.adobe.com/air/win/download/latest/AdobeAIRInstaller.exe")
            .name("AdobeAIRInstaller.exe")
            .get();

        this.wine.run(adobeair);
        this.wine.wait();

        this.wine.windowsVersion(currentWindowsVersion);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "adobeair", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new AdobeAir(wine).go();

        wizard.close();
    }
}

module.default = AdobeAir;
