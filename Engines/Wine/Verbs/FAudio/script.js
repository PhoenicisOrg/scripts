include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Verb to install FAudio
* see: https://github.com/Kron4ek/FAudio-Builds
* @returns {Wine} Wine object
*/
Wine.prototype.faudio = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/Kron4ek/FAudio-Builds/releases/download/19.01/faudio-19.01.tar.xz")
        .name("faudio-19.01.tar.xz")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory() + "/FAudio/")
        .extract();

    this.runInsidePrefix("/FAudio/faudio-19.01/wine_setup_faudio.sh")

    return this;
}

/**
 * Verb to install FAudio
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "FAudio", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.faudio();
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
