include("engines.wine.engine.object");
include("engines.wine.plugins.register_font");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");
include("utils.functions.filesystem.files");
include("utils.functions.filesystem.extract");

/**
* Verb to install the Tahoma font
* @returns {Wine} Wine object
*/
Wine.prototype.tahoma = function () {
    var tahoma = new Resource()
        .wizard(this.wizard())
        .url("https://master.dl.sourceforge.net/project/corefonts/OldFiles/IELPKTH.CAB")
        .checksum("40c3771ba4ce0811fe18a7a7903e40fcce46422d")
        .name("IELPKTH.CAB")
        .get();
    new CabExtract()
        .archive(tahoma)
        .to(this.prefixDirectory() + "/drive_c/tahoma/")
        .extract(["-L", "-F", "tahoma*.tff"]);

    cp(this.prefixDirectory() + "/drive_c/tahoma/tahoma.ttf", this.fontDirectory());
    cp(this.prefixDirectory() + "/drive_c/tahoma/tahomabd.ttf", this.fontDirectory());

    this.registerFont()
        .set("Tahoma", "tahoma.ttf")
        .set("Tahoma Bold", "tahomabd.ttf")
        .do();
    return this;
};

/**
 * Verb to install the Tahoma font
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "tahoma", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.tahoma();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);

