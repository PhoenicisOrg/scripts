include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");

/**
* Verb to install FAudio
* see: https://github.com/Kron4ek/FAudio-Builds
* @param {String} faudioVersion version of FAudio to downlaod
* @returns {Wine} Wine object
*/
Wine.prototype.faudio = function (faudioVersion) {
    if (typeof faudioVersion !== 'string')
        faudioVersion = "19.05";

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/Kron4ek/FAudio-Builds/releases/download/" + faudioVersion + "/faudio-" + faudioVersion + ".tar.xz")
        .name("faudio-" + faudioVersion + ".tar.xz")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory() + "/FAudio/")
        .extract();

    var forEach = Array.prototype.forEach;
    var sys32dir = this.system32directory();
    var faudioDir = this.prefixDirectory() + "/FAudio/faudio-" + faudioVersion;
    var self = this;

    forEach.call(ls(faudioDir + "/x32"), function (file) {
        if (file.endsWith(".dll")) {
            cp(faudioDir + "/x32/" + file, sys32dir);
            self.overrideDLL()
                .set("native", [file])
                .do();
        }
    });

    if (this.architecture() == "amd64")
    {
        var sys64dir = this.system64directory();
        forEach.call(ls(faudioDir + "/x64"), function (file) {
            if (file.endsWith(".dll")) {
                cp(faudioDir + "/x64/" + file, sys64dir);
            }
        });
    }

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
        var versions = ["19.05", "19.04", "19.03", "19.02", "19.01"];
        var selectedVersion = wizard.menu(tr("Please select the version."), versions, "19.05");
        wine.wizard(wizard);
        // install selected version
        wine.faudio(selectedVersion.text);
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
