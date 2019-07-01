include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("engines.wine.plugins.regsvr32");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");

/**
 * Verb to install quartz
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.quartz = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://download.microsoft.com/download/E/E/1/EE17FF74-6C45-4575-9CF4-7FC2597ACD18/directx_feb2010_redist.exe")
        .checksum("a97c820915dc20929e84b49646ec275760012a42")
        .name("directx_feb2010_redist.exe")
        .get();

    new CabExtract()
        .archive(setupFile)
        .wizard(this.wizard())
        .to(this.prefixDirectory() + "/TMP/")
        .extract(["-L", "-F", "dxnt.cab"]);

    new CabExtract()
        .archive(this.prefixDirectory() + "/TMP/dxnt.cab")
        .wizard(this.wizard())
        .to(this.system32directory())
        .extract(["-L", "-F", "quartz.dll"]);

    remove(this.prefixDirectory() + "/TMP/");

    this.regsvr32().install("quartz.dll");

    this.overrideDLL()
        .set("native, builtin", ["quartz"])
        .do()

    return this;
}

/**
 * Verb to install quartz
 */
// eslint-disable-next-line no-unused-vars
class QuartzVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "quartz", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.quartz();
        wizard.close();
    }
}
