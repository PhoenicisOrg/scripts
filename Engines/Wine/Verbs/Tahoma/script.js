const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { cp, fileExists, mkdir } = include("utils.functions.filesystem.files");
const { CabExtract } = include("utils.functions.filesystem.extract");

const Optional = Java.type("java.util.Optional");

const RegisterFont = include("engines.wine.plugins.register_font");

/**
 * Verb to install the Tahoma font
 */
class Tahoma {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const fontDirectory = this.wine.fontDirectory();

        if (!fileExists(fontDirectory)) {
            mkdir(fontDirectory);
        }

        const tahoma = new Resource()
            .wizard(wizard)
            .url("https://master.dl.sourceforge.net/project/corefonts/OldFiles/IELPKTH.CAB")
            .checksum("40c3771ba4ce0811fe18a7a7903e40fcce46422d")
            .name("IELPKTH.CAB")
            .get();

        new CabExtract()
            .wizard(wizard)
            .archive(tahoma)
            .to(`${prefixDirectory}/drive_c/tahoma/`)
            .extract(["-L", "-F", "tahoma*.ttf"]);

        cp(`${prefixDirectory}/drive_c/tahoma/tahoma.ttf`, fontDirectory);
        cp(`${prefixDirectory}/drive_c/tahoma/tahomabd.ttf`, fontDirectory);

        new RegisterFont(this.wine)
            .withFont("Tahoma", "tahoma.ttf")
            .withFont("Tahoma Bold", "tahomabd.ttf")
            .go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "tahoma", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Tahoma(wine).go();

        wizard.close();
    }
}

module.default = Tahoma;
