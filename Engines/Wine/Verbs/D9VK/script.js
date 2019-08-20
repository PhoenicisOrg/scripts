const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const {Extractor} = include("utils.functions.filesystem.extract");
const {ls, cp, cat, remove} = include("utils.functions.filesystem.files");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install D9VK
 * see: https://github.com/Joshua-Ashton/d9vk/
 *
 * @param {String} d9vkVersion D9VK version to download
 * @returns {Wine} Wine object
 */
Wine.prototype.D9VK = function (d9vkVersion) {
    var operatingSystemFetcher = Bean("operatingSystemFetcher");
    var uiQuestionFactory = Bean("uiQuestionFactory");
    print("NOTE: Wine version should be greater or equal to 3.10");
    if (operatingSystemFetcher.fetchCurrentOperationSystem().getFullName() !== "Linux")
    {
        uiQuestionFactory.create(
				tr("D9VK is currently unsupported on non-Linux operating systems due to MoltenVK implementation being incomplete. Do you want to continue? Choosing yes will skip DXVK verb installation and continue with other verbs. Choosing no will quit script installation."),
				() => return this;
			);
    }
    else 
    {
        this.wizard().message(tr("Please ensure you have the latest drivers (418.30 minimum for NVIDIA and mesa 19 for AMD) or else D9VK might not work correctly."));
    }

    if (typeof d9vkVersion !== 'string') 
    {
        d9vkVersion = "0.13f";
    }

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/Joshua-Ashton/d9vk/releases/download/" + d9vkVersion + "/d9vk-" + d9vkVersion + ".tar.gz")
        .name("d9vk-" + d9vkVersion + ".tar.gz")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory() + "/TMP/")
        .extract();

    var forEach = Array.prototype.forEach;
    var sys32dir = this.system32directory();
    var d9vkTmpDir = this.prefixDirectory() + "/TMP/d9vk-" + d9vkVersion;
    var self = this;

    //Copy 32 bits dll to system* and apply override
    forEach.call(ls(d9vkTmpDir + "/x32"), function (file) {
        if (file.endsWith(".dll")) {
            cp(d9vkTmpDir + "/x32/" + file, sys32dir);
            self.overrideDLL()
                .set("native", [file])
                .do();
        }
    });

    if (this.architecture() == "amd64") {
        var sys64dir = this.system64directory();
        //Copy 64 bits dll to system*
        forEach.call(ls(d9vkTmpDir + "/x64"), function (file) {
            if (file.endsWith(".dll")) {
                cp(d9vkTmpDir + "/x64/" + file, sys64dir);
            }
        });
    }

    remove(this.prefixDirectory() + "/TMP/");

    return this;
}

/**
 * Verb to install D9VK
 */
// eslint-disable-next-line no-unused-vars
class D9VKVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "D9VK", java.util.Optional.empty());
        var versions = ["0.13f", "0.13", "0.12", "0.11", "0.10"];
        var selectedVersion = wizard.menu(tr("Please select the version."), versions, "0.12");
        wine.wizard(wizard);
        // install selected version
        wine.D9VK(selectedVersion.text);
        wizard.close();
    }
}
