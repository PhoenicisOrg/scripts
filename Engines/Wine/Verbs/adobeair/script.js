include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "net", "resource"]);
include(["engines", "wine", "plugins", "windows_version"]);

/**
 * Verb to install adobeair
 * @returns {Wine} Wine object
 */
Wine.prototype.adobeair = function () {
    var adobeair = new Resource()
        .wizard(this.wizard())
        .url("https://airdownload.adobe.com/air/win/download/latest/AdobeAIRInstaller.exe")
        .checksum("68d26cca4c6c8230d3f7aa850ee227d518288dfc")
        .name("AdobeAIRInstaller.exe")
        .get();

    // Using Windows XP to workaround the wine bug 43506
    // See https://bugs.winehq.org/show_bug.cgi?id=43506
    var currentWindowsVersion = this.windowsVersion();
    this.windowsVersion("winxp");
    this.run(adobeair).wait();
    this.windowsVersion(currentWindowsVersion);

    return this;
};

/**
 * Verb to install adobeair
 */
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "adobeair", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.adobeair();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
