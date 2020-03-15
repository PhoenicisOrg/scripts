const Wine = include("engines.wine.engine.object");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

const Regedit = include("engines.wine.plugins.regedit");

/**
 * Verb to remove mono
 */
class RemoveMono {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const system32directory = this.wine.system32directory();

        if (this.wine.uninstall("Mono")) {
            wizard.wait(tr("Please wait..."));

            new Regedit(this.wine).deleteKey("HKLM\\Software\\Microsoft\\.NETFramework\\v2.0.50727\\SBSDisabled");

            wizard.wait(tr("Please wait..."));

            new Regedit(this.wine).deleteKey("HKLM\\Software\\Microsoft\\NET Framework Setup\\NDP\\v3.5");

            wizard.wait(tr("Please wait..."));

            new Regedit(this.wine).deleteKey("HKLM\\Software\\Microsoft\\NET Framework Setup\\NDP\\v4");

            remove(`${system32directory}/mscoree.dll`);

            if (this.wine.architecture() == "amd64") {
                const system64directory = this.wine.system64directory();
                remove(`${system64directory}/mscoree.dll`);
            }
        }
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "remove_mono", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new RemoveMono(wine).go();

        wizard.close();
    }
}

module.default = RemoveMono;
