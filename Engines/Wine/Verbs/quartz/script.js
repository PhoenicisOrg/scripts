const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");
const Regsvr32 = include("engines.wine.plugins.regsvr32");

/**
 * Verb to install quartz
 */
class Quartz {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "https://download.microsoft.com/download/E/E/1/EE17FF74-6C45-4575-9CF4-7FC2597ACD18/directx_feb2010_redist.exe"
            )
            .checksum("a97c820915dc20929e84b49646ec275760012a42")
            .name("directx_feb2010_redist.exe")
            .get();

        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/TMP/`)
            .extract(["-L", "-F", "dxnt.cab"]);

        new CabExtract()
            .wizard(wizard)
            .archive(`${prefixDirectory}/TMP/dxnt.cab`)
            .to(system32directory)
            .extract(["-L", "-F", "quartz.dll"]);

        remove(`${prefixDirectory}/TMP/`);

        new Regsvr32(this.wine).withDll("quartz.dll").go();

        new OverrideDLL(this.wine).withMode("native, builtin", ["quartz"]).go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "quartz", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        wine.quartz();

        wizard.close();
    }
}

module.default = Quartz;
