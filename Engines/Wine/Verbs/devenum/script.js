include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");
include("utils.functions.filesystem.files");
include("utils.functions.filesystem.extract");
include("engines.wine.plugins.regsvr32");

/**
 * Verb to install devenum
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.devenum = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://download.microsoft.com/download/E/E/1/EE17FF74-6C45-4575-9CF4-7FC2597ACD18/directx_feb2010_redist.exe")
        .checksum("a97c820915dc20929e84b49646ec275760012a42")
        .name("directx_feb2010_redist.exe")
        .get();
    this.wizard().wait(tr("Please wait while {0} is installed...", "devenum"));
    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory() + "/drive_c/devenum/")
        .extract(["-L", "-F", "dxnt.cab"]);
    new CabExtract()
        .archive(this.prefixDirectory() + "/drive_c/devenum/dxnt.cab")
        .to(this.system32directory())
        .extract(["-L", "-F", "devenum.dll"]);
    this.regsvr32().install("devenum.dll");
    this.overrideDLL()
        .set("native", ["devenum"])
        .do();

    return this;
};

/**
 * Verb to install devenum
 */
// eslint-disable-next-line no-unused-vars
class DevenumVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "devenum", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.devenum();
        wizard.close();
    }
}
