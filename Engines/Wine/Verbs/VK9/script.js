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
    print("NOTE: this is a debug dll");

    var vk9Version = "0.26.0";

    var setupFile32 = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/disks86/VK9/releases/download/" + vk9Version +"/"+ vk9Version + "-bin-x86-Debug.zip")
        .checksum("bc8970ae03e705b9871748a16ec6fa21dda5073e")
        .name(vk9Version + "-bin-x86-Debug")
        .get();

    var setupFile64 = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/disks86/VK9/releases/download/" + vk9Version +"/"+ vk9Version + "-bin-x86_64-Debug.zip")
        .checksum("4a5bfbe0242a4ddc55702660a36902f68e98caef")
        .name(vk9Version + "-bin-x86_64-Debug")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile32)
        .to(this.prefixDirectory() + "/TMP32/")
        .extract();

    if (this.architecture() == "x86") {
        cp("/TMP32/D3d9.dll", this.system32directory());
    }

    if (this.architecture() == "amd64") {
        new Extractor()
            .wizard(this.wizard())
            .archive(setupFile64)
            .to(this.prefixDirectory() + "/TMP64/")
            .extract();

        cp("/TMP32/D3d9.dll", this.system64directory());

        cp("/TMP64/D3d9.dll", this.system32directory());

        remove(this.prefixDirectory() + "/TMP64/");
    }

    this.overrideDLL()
        .set("native", ["d3d9"])
        .do();

    // Need to copy VK9.conf and shader into executable directory
    // var executables = this._fileSearcher.search(_shortcutPrefixDirectory, this._search);

    remove(this.prefixDirectory() + "/TMP32/");

    return this;
}
