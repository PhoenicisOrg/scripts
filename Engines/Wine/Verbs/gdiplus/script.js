const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const {CabExtract} = include("utils.functions.filesystem.extract");
const {cp, remove} = include("utils.functions.filesystem.files");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install gdiplus
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.gdiplus = function () {
    const setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X86.exe")
        .checksum("c3516bc5c9e69fee6d9ac4f981f5b95977a8a2fa")
        .name("windows6.1-KB976932-X86.exe")
        .get();
		
    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory() + "/drive_c/gdiplus/")
        .extract(["-L", "-F", "x86_microsoft.windows.gdiplus_6595b64144ccf1df_1.1.7601.17514_none_72d18a4386696c80/gdiplus.dll"]);
		
    cp(this.prefixDirectory() + "/drive_c/gdiplus/x86_microsoft.windows.gdiplus_6595b64144ccf1df_1.1.7601.17514_none_72d18a4386696c80/gdiplus.dll", this.system32directory());
	
    if (this.architecture() == "amd64") {
        const setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("https://download.microsoft.com/download/0/A/F/0AFB5316-3062-494A-AB78-7FB0D4461357/windows6.1-KB976932-X64.exe")
            .checksum("74865ef2562006e51d7f9333b4a8d45b7a749dab")
            .name("windows6.1-KB976932-X64.exe")
            .get();
			
        new CabExtract()
            .archive(setupFile64)
            .to(this.prefixDirectory() + "/drive_c/gdiplus/")
            .extract(["-L", "-F", "amd64_microsoft.windows.gdiplus_6595b64144ccf1df_1.1.7601.17514_none_2b24536c71ed437a/gdiplus.dll"]);
		
        cp(this.prefixDirectory() + "/drive_c/gdiplus/amd64_microsoft.windows.gdiplus_6595b64144ccf1df_1.1.7601.17514_none_2b24536c71ed437a/gdiplus.dll", this.system64directory());
    }

    remove(this.prefixDirectory() + "/drive_c/gdiplus/");

    this.overrideDLL()
        .set("native", ["gdiplus"])
        .do();

    return this;
};

/**
 * Verb to install gdiplus
 */
// eslint-disable-next-line no-unused-vars
module.default = class GdiplusVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        const wine = new Wine();
        wine.prefix(container);
        const wizard = SetupWizard(InstallationType.VERBS, "gdiplus", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.gdiplus();
        wizard.close();
    }
}
