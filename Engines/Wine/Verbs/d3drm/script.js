include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");
include("utils.functions.filesystem.files");
include("utils.functions.filesystem.extract");

/**
 * Verb to install d3drm
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.d3drm = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://download.microsoft.com/download/E/E/1/EE17FF74-6C45-4575-9CF4-7FC2597ACD18/directx_feb2010_redist.exe")
        .checksum("a97c820915dc20929e84b49646ec275760012a42")
        .name("directx_feb2010_redist.exe")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "d3drm"));

    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory() + "/drive_c/d3drm/")
        .extract(["-L", "-F", "dxnt.cab"]);

    new CabExtract()
        .archive(this.prefixDirectory() + "/drive_c/d3drm/dxnt.cab")
        .to(this.system32directory())
        .extract(["-L", "-F", "d3drm.dll"]);

    this.overrideDLL()
        .set("native", ["d3drm"])
        .do();

    return this;
};

/**
 * Verb to install d3drm
 */
// eslint-disable-next-line no-unused-vars
class D3drmVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "d3drm", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.d3drm();
        wizard.close();
    }
}
