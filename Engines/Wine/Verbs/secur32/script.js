include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

/**
* Inspired from winetricks secur32
* -> https://github.com/Winetricks/winetricks/blob/63bc6dbe612d017a0cb6bf6e4cde265162d75bca/src/winetricks#L8744
* @returns {Wine}
*/
Wine.prototype.secur32 = function() {
	var setupFile = new Resource()
            .wizard(this._wizard)
            .url("https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X86.exe")
            .checksum("c3516bc5c9e69fee6d9ac4f981f5b95977a8a2fa")
            .name("windows6.1-KB976932-X86.exe")
            .get();
		
	new CabExtract()
            .archive(setupFile)
            .wizard(this._wizard)
            .to(this.prefixDirectory + "/TMP/")
            .extract(["-L", "-F", "x86_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_a851f4adbb0d5141/secur32.dll"]);
		
	cp(this.prefixDirectory + "/TMP/" + "x86_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_a851f4adbb0d5141/secur32.dll", this.system32directory());
	
	remove(this.prefixDirectory + "/TMP/");
	
        if (this.architecture() == "amd64") {
            var setupFile = new Resource()
                .wizard(this._wizard)
                .url("https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X64.exe")
                .checksum("74865ef2562006e51d7f9333b4a8d45b7a749dab")
                .name("windows6.1-KB976932-X64.exe")
                .get();
		
            new CabExtract()
                .archive(setupFile)
                .wizard(this._wizard)
                .to(this.prefixDirectory + "/TMP/")
                .extract(["-L", "-F", "amd64_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_04709031736ac277/secur32.dll"]);
			
            cp(this.prefixDirectory + "/TMP/" + "amd64_microsoft-windows-lsa_31bf3856ad364e35_6.1.7601.17514_none_04709031736ac277/secur32.dll", this.system64directory());
	
            remove(this.prefixDirectory + "/TMP/");
	}
	
	this.overrideDLL()
            .set("native, builtin", ["secur32"])
            .do()
		
	return this;
}
