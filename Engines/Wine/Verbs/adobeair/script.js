include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);
include(["engines", "wine", "verbs", "luna"]);

/**
* Verb to install adobeair
* @returns {Wine} Wine object // Verify
*/
Wine.prototype.adobeair = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://airdownload.adobe.com/air/win/download/latest/AdobeAIRInstaller.exe")
        .checksum("24532d41ef2588c0daac4b6f8b7f863ee3c1a1b1e90b2d8d8b3eb4faa657e5e3")
        .name("AdobeAIRInstaller.exe")
        .get();
  
        this.wizard().wait(tr("Please wait while {0} is installed...", "Adobe air"));
        this.run(setupFile, "/S", null, false, true);

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
