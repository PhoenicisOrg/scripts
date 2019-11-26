const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

const WindowsVersion = include("engines.wine.plugins.windows_version");

/**
 * Verb to install adobeair
 */
class AdobeAir {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        // Using Windows XP to workaround the wine bug 43506
        // See https://bugs.winehq.org/show_bug.cgi?id=43506
        const currentWindowsVersion = new WindowsVersion(this.wine).getWindowsVersion();

        new WindowsVersion(this.wine).withWindowsVersion("winxp").go();

        const adobeair = new Resource()
            .wizard(wizard)
            .url("https://airdownload.adobe.com/air/win/download/latest/AdobeAIRInstaller.exe")
            .name("AdobeAIRInstaller.exe")
            .get();

        this.wine.run(adobeair);

        this.wine.wait();

        new WindowsVersion(this.wine).withWindowsVersion(currentWindowsVersion).go();
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
