include("engines.wine.engine.object");
include("engines.wine.plugins.regedit");
include("utils.functions.filesystem.files");
include("utils.functions.net.resource");

/**
 * Verb to install luna
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.luna = function () {
    var lunaStyle = new Resource()
        .wizard(this.wizard())
        .url("https://repository.playonlinux.com/divers/luna.msstyles")
        .checksum("50a71767f90c1d3d86ca188a84393f2d39664311")
        .name("luna.msstyles")
        .get();

    var lunaReg = new Resource()
        .wizard(this.wizard())
        .url("https://repository.playonlinux.com/divers/luna.reg")
        .checksum("074e655d391ae87527f4cc50ba822a8aad83a09f")
        .name("luna.reg")
        .get();


    mkdir(this.prefixDirectory() + "/drive_c/windows/Resources/Themes/luna/");
    cp(lunaStyle, this.prefixDirectory() + "/drive_c/windows/Resources/Themes/luna/");
    this.regedit().open(lunaReg);

    return this;
};

/**
 * Verb to install luna
 */
// eslint-disable-next-line no-unused-vars
class LunaVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "luna", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.luna();
        wizard.close();
    }
}
