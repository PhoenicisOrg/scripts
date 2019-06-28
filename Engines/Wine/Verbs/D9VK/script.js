include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");

/**
* Verb to install D9VK
* see: https://github.com/Joshua-Ashton/d9vk/
* @param {String} d9vkVersion D9VK version to download
* @returns {Wine} Wine object
*/
Wine.prototype.D9VK = function (d9vkVersion) {
    var operatingSystemFetcher = Bean("operatingSystemFetcher");
    print("NOTE: Wine version should be greater or equal to 3.10");
    if (operatingSystemFetcher.fetchCurrentOperationSystem() != "Linux")
    {
        this.wizard().message(tr("D9VK might not work correctly on macOS. This is depending on Metal api support and MoltenVK compatibility layer advancement"));
    }
    else
    {
        this.wizard().message(tr("Please ensure you have the latest drivers (418.30 minimum for NVIDIA and mesa 19 for AMD) or else D9VK might not work correctly."));
    }

    if (typeof d9vkVersion !== 'string')
    {
        d9vkVersion = "0.12";
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

    if (this.architecture() == "amd64")
    {
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
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "D9VK", java.util.Optional.empty());
        var versions = ["0.12", "0.11", "0.10"];
        var selectedVersion = wizard.menu(tr("Please select the version."), versions, "0.12");
        wine.wizard(wizard);
        // install selected version
        wine.D9VK(selectedVersion.text);
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);
