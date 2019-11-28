const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { fileExists, remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");

/**
 * Verb to install mfc42.dll and mfc42u.dll
 */
class Mfc42 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const system32directory = this.wine.system32directory();

        const setupFile = new Resource()
            .wizard(wizard)
            .url("http://download.microsoft.com/download/vc60pro/Update/2/W9XNT4/EN-US/VC6RedistSetup_deu.exe")
            .checksum("a8c4dd33e281c166488846a10edf97ff0ce37044")
            .name("VC6RedistSetup_deu.exe")
            .get();

        if (fileExists(`${system32directory}/mfc42.dll`)) {
            remove(`${system32directory}/mfc42.dll`);
        }
        if (fileExists(`${system32directory}/mfc42u.dll`)) {
            remove(`${system32directory}/mfc42u.dll`);
        }

        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(system32directory)
            .extract();

        new CabExtract()
            .wizard(wizard)
            .archive(`${system32directory}/vcredist.exe`)
            .to(system32directory)
            .extract(["-F", "mfc42*.dll"]);

        new OverrideDLL(this.wine).withMode("native, builtin", ["mfc42", "mfc42u"]).go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "mfc42", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Mfc42(wine).go();

        wizard.close();
    }
}

module.default = Mfc42;
