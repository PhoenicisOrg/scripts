include(["Functions", "Engines", "Wine"]);
include(["Functions", "Filesystem", "Files"]);
include(["Functions", "Net", "Resource"]);

Wine.prototype.luna = function() {
    var lunaStyle = new Resource()
        .wizard(setupWizard)
        .url("http://repository.playonlinux.com/divers/luna.msstyles")
        .checksum("50a71767f90c1d3d86ca188a84393f2d39664311")
        .name("luna.msstyles")
        .get();

    var lunaReg = new Resource()
        .wizard(setupWizard)
        .url("http://repository.playonlinux.com/divers/luna.reg")
        .checksum("074e655d391ae87527f4cc50ba822a8aad83a09f")
        .name("luna.reg")
        .get();


    mkdir(this.prefixDirectory + "/drive_c/windows/Resources/Themes/luna/");
    cp(lunaStyle, this.prefixDirectory + "/drive_c/windows/Resources/Themes/luna/");
    this.regedit().open(lunaReg);

    return this;
};