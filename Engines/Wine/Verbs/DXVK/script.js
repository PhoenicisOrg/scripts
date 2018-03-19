include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);
include(["Utils", "Functions", "Filesystem", "Files"]);
include(["Engines", "Wine", "Verbs", "vulkanSDK"]);

/**
* Setup DXVK
* -> https://github.com/doitsujin/dxvk/
* @returns {Wine}
*/
Wine.prototype.DXVK = function() {
	this.vulkanSDK();
        print("NOTE: you need a driver that support Vulkan enough to run DXVK");
	
	var setupFile = new Resource()
		.wizard(this._wizard)
                .url("https://github.com/doitsujin/dxvk/releases/download/v0.31/dxvk-0.31.tar.gz")
                .checksum("9e3c377a91b6f75a095d85ce4fc19f96bf4cab65")
                .name("dxvk-0.31.tar.gz")
		.get();
		
        var setupExtracted = new Extractor()
                .wizard(this._wizard)
                .archive(setupFile)
                .to(this.prefixDirectory + "/TMP/")
                .extract();
        
        cp(this.prefixDirectory + "/TMP/dxvk-0.31/x32/d3d11.dll", this.system32directory());
        cp(this.prefixDirectory + "/TMP/dxvk-0.31/x32/dxgi.dll", this.system32directory());
        
        
        if (this.architecture() == "amd64") {
            cp(this.prefixDirectory + "/TMP/dxvk-0.31/x64/d3d11.dll", this.system64directory());
            cp(this.prefixDirectory + "/TMP/dxvk-0.31/x64/dxgi.dll", this.system64directory());
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
