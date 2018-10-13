include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Setup VK9-> https://github.com/disks86/VK9
* @param {String} vk9Version VK9 version to install
* @returns {Wine} Wine object
*/
Wine.prototype.VK9 = function (vk9Version) {
    print("NOTE: you need a driver that supports Vulkan enough to run VK9");
    print("NOTE: wine version should be greater or equal to 3.5");
    print("NOTE: works from 0.28.0");

    if (typeof vk9Version != ='string')
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
