include("engines.wine.engine.object");
include("engines.wine.plugins.register_font");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");

/**
 * Verb to install corefonts
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.corefonts = function () {
    var fontResources =
        [
            new Resource()
                .wizard(this.wizard())
                .url("https://mirrors.kernel.org/gentoo/distfiles/arial32.exe")
                .checksum("6d75f8436f39ab2da5c31ce651b7443b4ad2916e")
                .name("arial32.exe")
                .get(),

            new Resource()
                .wizard(this.wizard())
                .url("https://mirrors.kernel.org/gentoo/distfiles/arialb32.exe")
                .checksum("d45cdab84b7f4c1efd6d1b369f50ed0390e3d344")
                .name("arialb32.exe")
                .get(),

            new Resource()
                .wizard(this.wizard())
                .url("https://mirrors.kernel.org/gentoo/distfiles/comic32.exe")
                .checksum("2371d0327683dcc5ec1684fe7c275a8de1ef9a51")
                .name("comic32.exe")
                .get(),

            new Resource()
                .wizard(this.wizard())
                .url("https://mirrors.kernel.org/gentoo/distfiles/courie32.exe")
                .checksum("06a745023c034f88b4135f5e294fece1a3c1b057")
                .name("courie32.exe")
                .get(),

            new Resource()
                .wizard(this.wizard())
                .url("https://mirrors.kernel.org/gentoo/distfiles/georgi32.exe")
                .checksum("90e4070cb356f1d811acb943080bf97e419a8f1e")
                .name("georgi32.exe")
                .get(),

            new Resource()
                .wizard(this.wizard())
                .url("https://mirrors.kernel.org/gentoo/distfiles/impact32.exe")
                .checksum("86b34d650cfbbe5d3512d49d2545f7509a55aad2")
                .name("impact32.exe")
                .get(),

            new Resource()
                .wizard(this.wizard())
                .url("https://mirrors.kernel.org/gentoo/distfiles/times32.exe")
                .checksum("20b79e65cdef4e2d7195f84da202499e3aa83060")
                .name("times32.exe")
                .get(),

            new Resource()
                .wizard(this.wizard())
                .url("https://mirrors.kernel.org/gentoo/distfiles/trebuc32.exe ")
                .checksum("50aab0988423efcc9cf21fac7d64d534d6d0a34a")
                .name("trebuc32.exe")
                .get(),

            new Resource()
                .wizard(this.wizard())
                .url("https://mirrors.kernel.org/gentoo/distfiles/verdan32.exe ")
                .checksum("f5b93cedf500edc67502f116578123618c64a42a")
                .name("verdan32.exe")
                .get(),

            new Resource()
                .wizard(this.wizard())
                .url("https://mirrors.kernel.org/gentoo/distfiles/webdin32.exe ")
                .checksum("2fb4a42c53e50bc70707a7b3c57baf62ba58398f")
                .name("webdin32.exe")
                .get()
        ];

    var progressBar = this.wizard().progressBar(tr("Please wait..."));
    progressBar.setText(tr("Installing {0}...", tr("fonts")));
    progressBar.setProgressPercentage(0.);

    var numInstalledFonts = 0;

    var that = this;
    fontResources.forEach(function (fontResource) {
        progressBar.setText(tr("Installing {0}...", tr("fonts")));
        progressBar.setProgressPercentage(numInstalledFonts * 100 / fontResources.length);

        new CabExtract()
            .archive(fontResource)
            .wizard(null)
            .to(that.fontDirectory())
            .extract();

        numInstalledFonts++;
    });

    this.registerFont()
        .set("Arial", "Arial.TTF")
        .set("Arial Bold", "Arialbd.TTF")
        .set("Arial Bold Italic", "Arialbi.TTF")
        .set("Arial Italic", "Ariali.TTF")
        .set("Arial Black", "AriBlk.TTF")
        .set("Comic Sans MS", "Comic.TTF")
        .set("Comic Sans MS Bold", "Comicbd.TTF")
        .set("Courier New", "Cour.TTF")
        .set("Courier New Bold", "CourBD.TTF")
        .set("Courier New Bold Italic", "CourBI.TTF")
        .set("Courier New Italic", "Couri.TTF")
        .set("Georgia", "Georgia.TTF")
        .set("Georgia Bold", "Georgiab.TTF")
        .set("Georgia Bold Italic", "Georgiaz.TTF")
        .set("Georgia Italic", "Georgiai.TTF")
        .set("Impact", "Impact.TTF")
        .set("Times New Roman", "Times.TTF")
        .set("Times New Roman Bold", "Timesbd.TTF")
        .set("Times New Roman Bold Italic", "Timesbi.TTF")
        .set("Times New Roman Italic", "Timesi.TTF")
        .set("Trebucet MS", "Trebuc.TTF")
        .set("Trebucet MS Bold", "Trebucbd.TTF")
        .set("Trebucet MS Bold Italic", "Trebucbi.TTF")
        .set("Trebucet MS Italic", "Trebucit.TTF")
        .set("Verdana", "Verdana.TTF")
        .set("Verdana Bold", "Verdanab.TTF")
        .set("Verdana Bold Italic", "Verdanaz.TTF")
        .set("Verdana Italic", "Verdanai.TTF")
        .set("Webdings", "Webdings.TTF")
        .do();
    return this;
}

/**
 * Verb to install corefonts
 */
// eslint-disable-next-line no-unused-vars
class CorefontsVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "corefonts", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.corefonts();
        wizard.close();
    }
}
