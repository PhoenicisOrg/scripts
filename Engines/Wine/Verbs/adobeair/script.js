include("engines.wine.engine.object");
include("engines.wine.plugins.windows_version");
include("utils.functions.net.resource");

/**
 * Verb to install adobeair
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.adobeair = function () {
    const adobeair = new Resource()
        .wizard(this.wizard())
        .url("https://airdownload.adobe.com/air/win/download/latest/AdobeAIRInstaller.exe")
        .checksum("1ca3fce6593960706526d26563a398cef37628cc")
        .name("AdobeAIRInstaller.exe")
        .get();

    // Using Windows XP to workaround the wine bug 43506
    // See https://bugs.winehq.org/show_bug.cgi?id=43506
    const currentWindowsVersion = this.windowsVersion();

    this.windowsVersion("winxp");

    this.run(adobeair);
    this.wait();

    this.windowsVersion(currentWindowsVersion);

    return this;
};

/**
 * Verb to install adobeair
 */
// eslint-disable-next-line no-unused-vars
class AdobeAirVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        const wine = new Wine();
        wine.prefix(container);

        const wizard = SetupWizard(InstallationType.VERBS, "adobeair", java.util.Optional.empty());
        wine.wizard(wizard);

        wine.adobeair();

        wizard.close();
    }
}
