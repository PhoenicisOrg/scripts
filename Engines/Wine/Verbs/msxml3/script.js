const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install msxml3
 */
class Msxml3 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const system32directory = this.wine.system32directory();

        const setupFile32 = new Resource()
            .wizard(wizard)
            .url("https://media.codeweavers.com/pub/other/msxml3.msi")
            .checksum("d4c2178dfb807e1a0267fce0fd06b8d51106d913")
            .name("msxml3.msi")
            .get();

        remove(`${system32directory}/msxml3.dll`);

        this.wine
            .overrideDLL()
            .set("native", ["msxml3"])
            .do();

        wizard.wait(tr("Please wait while {0} is installed...", "msxml3"));

        this.wine.run(setupFile32, ["/q:a", "/c:msxml3.msi /q"], null, false, true);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "msxml3", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Msxml3(wine).go();

        wizard.close();
    }
}

module.default = Msxml3;
