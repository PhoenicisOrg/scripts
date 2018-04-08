include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

/**
* Setup DXVK
* -> https://github.com/doitsujin/dxvk/
* @returns {Wine}
*/
Wine.prototype.DXVK = function() {
    print("NOTE: you need a driver that support Vulkan enough to run DXVK");
    print("NOTE: wine version should be greater or equal to 3.5");
	
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://github.com/doitsujin/dxvk/releases/download/v0.41/dxvk-0.41.tar.gz")
        .checksum("4bbcb3020ba12a5a0cb7c388264579068b307bc6")
        .name("dxvk-0.41.tar.gz")
        .get();	
	
    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory + "/TMP/")
        .extract();
        
    if (this.architecture() == "x86") {
        cp(this.prefixDirectory + "/TMP/dxvk-0.41/x32/d3d11.dll", this.system32directory());
        cp(this.prefixDirectory + "/TMP/dxvk-0.41/x32/dxgi.dll", this.system32directory());
    }
          
    if (this.architecture() == "amd64") {
        cp(this.prefixDirectory + "/TMP/dxvk-0.41/x32/d3d11.dll", this.system64directory());
        cp(this.prefixDirectory + "/TMP/dxvk-0.41/x32/dxgi.dll", this.system64directory());
	
        cp(this.prefixDirectory + "/TMP/dxvk-0.41/x64/d3d11.dll", this.system32directory());
        cp(this.prefixDirectory + "/TMP/dxvk-0.41/x64/dxgi.dll", this.system32directory());
    }
      
    this.overrideDLL()
        .set("native", ["d3d11"])
        .do();

    this.overrideDLL()
        .set("native", ["dxgi"])
        .do();
	
    remove(this.prefixDirectory + "/TMP/");
	
    return this;	
}
