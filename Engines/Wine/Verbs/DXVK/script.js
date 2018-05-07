include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "net", "resource"]);
include(["utils", "functions", "filesystem", "files"]);

/**
* Setup DXVK-> https://github.com/doitsujin/dxvk/
* @returns {Wine} Wine object
*/
Wine.prototype.DXVK = function () {
    print("NOTE: you need a driver that support Vulkan enough to run DXVK");
    print("NOTE: wine version should be greater or equal to 3.5");
    
    var dxvkVersion = "0.50";

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/doitsujin/dxvk/releases/download/v" + dxvkVersion + "/dxvk-" + dxvkVersion + ".tar.gz")
        .checksum("4bbcb3020ba12a5a0cb7c388264579068b307bc6")
        .name("dxvk-" + dxvkVersion + ".tar.gz")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory() + "/TMP/")
        .extract();

    var dxvkTmpDir = this.prefixDirectory() + "/TMP/dxvk-" + dxvkVersion;

    if (this.architecture() == "x86") {
        cp(dxvkTmpDir + "/x32/d3d11.dll", this.system32directory());
        cp(dxvkTmpDir + "/x32/dxgi.dll", this.system32directory());
    }

    if (this.architecture() == "amd64") {
        cp(dxvkTmpDir + "/x32/d3d11.dll", this.system64directory());
        cp(dxvkTmpDir + "/x32/dxgi.dll", this.system64directory());

        cp(dxvkTmpDir + "/x64/d3d11.dll", this.system32directory());
        cp(dxvkTmpDir + "/x64/dxgi.dll", this.system32directory());
    }

    this.overrideDLL()
        .set("native", ["d3d11", "dxgi"])
        .do();

    remove(this.prefixDirectory() + "/TMP/");

    return this;
}
