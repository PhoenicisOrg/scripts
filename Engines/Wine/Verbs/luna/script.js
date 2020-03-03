const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { mkdir, cp } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

const Regedit = include("engines.wine.plugins.regedit");

/**
 * Verb to install luna
 */
class Luna {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();

        const lunaStyle = new Resource()
            .wizard(wizard)
            .url("https://repository.playonlinux.com/divers/luna.msstyles")
            .checksum("50a71767f90c1d3d86ca188a84393f2d39664311")
            .name("luna.msstyles")
            .get();

        const lunaReg = new Resource()
            .wizard(wizard)
            .url("https://repository.playonlinux.com/divers/luna.reg")
            .checksum("074e655d391ae87527f4cc50ba822a8aad83a09f")
            .name("luna.reg")
            .get();

        mkdir(`${prefixDirectory}/drive_c/windows/Resources/Themes/luna/`);

        cp(lunaStyle, `${prefixDirectory}/drive_c/windows/Resources/Themes/luna/`);

        new Regedit(this.wine).open(lunaReg);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "luna", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Luna(wine).go();

        wizard.close();
    }
}

module.default = Luna;
