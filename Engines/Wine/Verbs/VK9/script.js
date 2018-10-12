include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Setup VK9-> https://github.com/disks86/VK9
* @returns {Wine} Wine object
*/
Wine.prototype.VK9 = function () {
    print("NOTE: you need a driver that supports Vulkan enough to run VK9");
    print("NOTE: wine version should be greater or equal to 3.5");

    var vk9Version = "0.28.1";

    var setupFile32 = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/disks86/VK9/releases/download/" + vk9Version +"/"+ vk9Version + "-bin-x86-Release.zip")
        .checksum("da39a3ee5e6b4b0d3255bfef95601890afd80709")
        .name(vk9Version + "-bin-x86-Realease.zip")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile32)
        .to(this.prefixDirectory() + "/TMP32/")
        .extract();

    cp(this.prefixDirectory() + "/TMP32/d3d9.dll", this.system32directory());

    remove(this.prefixDirectory() + "/TMP32/");

    if (this.architecture() == "amd64")
    {
        var setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("https://github.com/disks86/VK9/releases/download/" + vk9Version +"/"+ vk9Version + "-bin-x86_64-Release.zip")
            .checksum("4f50beda158d50b9b0bb8d293838686e7225de18")
            .name(vk9Version + "-bin-x86_64-Realease.zip")
            .get();

        new Extractor()
            .wizard(this.wizard())
            .archive(setupFile64)
            .to(this.prefixDirectory() + "/TMP64/")
            .extract();
      
        cp(this.prefixDirectory() + "/TMP64/d3d9.dll", this.system64directory());

        remove(this.prefixDirectory() + "/TMP64/");
    }

    this.overrideDLL()
        .set("native", ["d3d9"])
        .do();
    
    return this;
}
