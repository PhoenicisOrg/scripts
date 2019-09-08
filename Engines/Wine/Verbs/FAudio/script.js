const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const {Extractor} = include("utils.functions.filesystem.extract");
const {ls, cp} = include("utils.functions.filesystem.files");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install FAudio
 * see: https://github.com/Kron4ek/FAudio-Builds
 *
 * @param {String} faudioVersion version of FAudio to downlaod
 * @returns {Wine} Wine object
 */
Wine.prototype.faudio = function (faudioVersion) {
    if (this.architecture() != "amd64") {
        throw "FAudio does not support 32bit architecture.";
    }
    if (typeof faudioVersion !== "string") {
        faudioVersion = "19.08";
    }

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url(
            "https://github.com/Kron4ek/FAudio-Builds/releases/download/" +
                faudioVersion +
                "/faudio-" +
                faudioVersion +
                ".tar.xz"
        )
        .name("faudio-" + faudioVersion + ".tar.xz")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory() + "/FAudio/")
        .extract();

    var forEach = Array.prototype.forEach;
    var sys64dir = this.system64directory();
    var faudioDir = this.prefixDirectory() + "/FAudio/faudio-" + faudioVersion;
    var self = this;

    forEach.call(ls(faudioDir + "/x64"), function (file) {
        if (file.endsWith(".dll")) {
            cp(faudioDir + "/x64/" + file, sys64dir);
            self.overrideDLL()
                .set("native", [file])
                .do();
        }
    });

    return this;
};

/**
 * Verb to install FAudio
 */
// eslint-disable-next-line no-unused-vars
module.default = class FAudioVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        const wizard = SetupWizard(InstallationType.VERBS, "FAudio", java.util.Optional.empty());
        const versions = ["19.08", "19.07", "19.06.07", "19.06", "19.05", "19.04", "19.03", "19.02", "19.01"];

        const selectedVersion = wizard.menu(tr("Please select the version."), versions, "19.08");

        const wine = new Wine();
        wine.prefix(container);
        wine.wizard(wizard);
        // install selected version
        wine.faudio(selectedVersion.text);

        wizard.close();
    }
}
