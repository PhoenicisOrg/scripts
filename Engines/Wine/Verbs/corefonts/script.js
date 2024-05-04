const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");

const Optional = Java.type("java.util.Optional");

const RegisterFont = include("engines.wine.plugins.register_font");

/**
 * Verb to install corefonts
 */
class Corefonts {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const fontDirectory = this.wine.fontDirectory();

        const fontResources = [
            new Resource()
                .wizard(wizard)
                .url("https://github.com/pushcx/corefonts/raw/master/arial32.exe")
                .checksum("6d75f8436f39ab2da5c31ce651b7443b4ad2916e")
                .name("arial32.exe")
                .get(),

            new Resource()
                .wizard(wizard)
                .url("https://github.com/pushcx/corefonts/raw/master/arialb32.exe")
                .checksum("d45cdab84b7f4c1efd6d1b369f50ed0390e3d344")
                .name("arialb32.exe")
                .get(),

            new Resource()
                .wizard(wizard)
                .url("https://github.com/pushcx/corefonts/raw/master/comic32.exe")
                .checksum("2371d0327683dcc5ec1684fe7c275a8de1ef9a51")
                .name("comic32.exe")
                .get(),

            new Resource()
                .wizard(wizard)
                .url("https://github.com/pushcx/corefonts/raw/master/courie32.exe")
                .checksum("06a745023c034f88b4135f5e294fece1a3c1b057")
                .name("courie32.exe")
                .get(),

            new Resource()
                .wizard(wizard)
                .url("https://github.com/pushcx/corefonts/raw/master/georgi32.exe")
                .checksum("90e4070cb356f1d811acb943080bf97e419a8f1e")
                .name("georgi32.exe")
                .get(),

            new Resource()
                .wizard(wizard)
                .url("https://github.com/pushcx/corefonts/raw/master/impact32.exe")
                .checksum("86b34d650cfbbe5d3512d49d2545f7509a55aad2")
                .name("impact32.exe")
                .get(),

            new Resource()
                .wizard(wizard)
                .url("https://github.com/pushcx/corefonts/raw/master/times32.exe")
                .checksum("20b79e65cdef4e2d7195f84da202499e3aa83060")
                .name("times32.exe")
                .get(),

            new Resource()
                .wizard(wizard)
                .url("https://github.com/pushcx/corefonts/raw/master/trebuc32.exe ")
                .checksum("50aab0988423efcc9cf21fac7d64d534d6d0a34a")
                .name("trebuc32.exe")
                .get(),

            new Resource()
                .wizard(wizard)
                .url("https://github.com/pushcx/corefonts/raw/master/verdan32.exe ")
                .checksum("f5b93cedf500edc67502f116578123618c64a42a")
                .name("verdan32.exe")
                .get(),

            new Resource()
                .wizard(wizard)
                .url("https://github.com/pushcx/corefonts/raw/master/webdin32.exe ")
                .checksum("2fb4a42c53e50bc70707a7b3c57baf62ba58398f")
                .name("webdin32.exe")
                .get()
        ];

        const progressBar = wizard.progressBar(tr("Please wait..."));
        progressBar.setText(tr("Installing {0}...", tr("fonts")));
        progressBar.setProgressPercentage(0);

        fontResources.reduce((numInstalledFonts, fontResource) => {
            progressBar.setText(tr("Installing {0}...", tr("fonts")));
            progressBar.setProgressPercentage((numInstalledFonts * 100) / fontResources.length);

            new CabExtract()
                .wizard(wizard)
                .archive(fontResource)
                .to(fontDirectory)
                .extract();

            return numInstalledFonts + 1;
        }, 0);

        new RegisterFont(this.wine)
            .withFont("Arial", "Arial.TTF")
            .withFont("Arial Bold", "Arialbd.TTF")
            .withFont("Arial Bold Italic", "Arialbi.TTF")
            .withFont("Arial Italic", "Ariali.TTF")
            .withFont("Arial Black", "AriBlk.TTF")
            .withFont("Comic Sans MS", "Comic.TTF")
            .withFont("Comic Sans MS Bold", "Comicbd.TTF")
            .withFont("Courier New", "Cour.TTF")
            .withFont("Courier New Bold", "CourBD.TTF")
            .withFont("Courier New Bold Italic", "CourBI.TTF")
            .withFont("Courier New Italic", "Couri.TTF")
            .withFont("Georgia", "Georgia.TTF")
            .withFont("Georgia Bold", "Georgiab.TTF")
            .withFont("Georgia Bold Italic", "Georgiaz.TTF")
            .withFont("Georgia Italic", "Georgiai.TTF")
            .withFont("Impact", "Impact.TTF")
            .withFont("Times New Roman", "Times.TTF")
            .withFont("Times New Roman Bold", "Timesbd.TTF")
            .withFont("Times New Roman Bold Italic", "Timesbi.TTF")
            .withFont("Times New Roman Italic", "Timesi.TTF")
            .withFont("Trebucet MS", "Trebuc.TTF")
            .withFont("Trebucet MS Bold", "Trebucbd.TTF")
            .withFont("Trebucet MS Bold Italic", "Trebucbi.TTF")
            .withFont("Trebucet MS Italic", "Trebucit.TTF")
            .withFont("Verdana", "Verdana.TTF")
            .withFont("Verdana Bold", "Verdanab.TTF")
            .withFont("Verdana Bold Italic", "Verdanaz.TTF")
            .withFont("Verdana Italic", "Verdanai.TTF")
            .withFont("Webdings", "Webdings.TTF")
            .go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "corefonts", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Corefonts(wine).go();

        wizard.close();
    }
}

module.default = Corefonts;
