include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Verb to install VK9
* see: https://github.com/disks86/VK9
* @param {String} vk9Version VK9 version to install
* @returns {Wine} Wine object
*/
Wine.prototype.VK9 = function (vk9Version) {
    print("NOTE: you need a driver that supports Vulkan enough to run VK9");
    print("NOTE: wine version should be greater or equal to 3.5");
    print("NOTE: works from 0.28.0");

    if (typeof vk9Version !== 'string')
        vk9Version = "0.28.1";

    var setupFile32 = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/disks86/VK9/releases/download/" + vk9Version +"/"+ vk9Version + "-bin-x86-Release.zip")
        .name(vk9Version + "-bin-x86-Realease.zip")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile32)
        .to(this.prefixDirectory() + "/TMP32/")
        .extract();

    cp(this.prefixDirectory() + "/TMP32/" + vk9Version + "-bin-x86-Release/" + "d3d9.dll", this.system32directory());

    remove(this.prefixDirectory() + "/TMP32/");

    if (this.architecture() === "amd64")
    {
        var setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("https://github.com/disks86/VK9/releases/download/" + vk9Version +"/"+ vk9Version + "-bin-x86_64-Release.zip")
            .name(vk9Version + "-bin-x86_64-Realease.zip")
            .get();

        new Extractor()
            .wizard(this.wizard())
            .archive(setupFile64)
            .to(this.prefixDirectory() + "/TMP64/")
            .extract();

        cp(this.prefixDirectory() + "/TMP64/" + vk9Version + "-bin-x86_64-Release/" + "d3d9.dll", this.system64directory());

        remove(this.prefixDirectory() + "/TMP64/");
    }

    this.overrideDLL()
        .set("native", ["d3d9"])
        .do();

    return this;
}

/**
 * Verb to install VK9
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "VK9", java.util.Optional.empty());
        var versions = ["0.28.1", "0.28.0", "0.27.0", "0.26.0", "0.25.0", "0.23.0", "0.17.0", "0.16.0", "0.6.0", "0.4.0"];
        var selectedVersion = wizard.menu(tr("Please select the version."), versions, "0.28.1");
        wine.wizard(wizard);
        wine.VK9(selectedVersion);
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);

