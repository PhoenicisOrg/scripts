const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const {CabExtract} = include("utils.functions.filesystem.extract");
const {remove, cat, writeToFile} = include("utils.functions.filesystem.files");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install gdiplus (windows xp)
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.gdiplus_winxp = function () {	
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://download.microsoft.com/download/1/4/6/1467c2ba-4d1f-43ad-8d9b-3e8bc1c6ac3d/NDP1.0sp2-KB830348-X86-Enu.exe")
        .checksum("6113cd89d77525958295ccbd73b5fb8b89abd0aa")
        .name("NDP1.0sp2-KB830348-X86-Enu.exe")
        .get();
		
    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory() + "/drive_c/gdiplus/")
        .extract(["-F", "FL_gdiplus_dll_____X86.3643236F_FC70_11D3_A536_0090278A1BB8"]);
		
	var content = cat(this.prefixDirectory() + "/drive_c/gdiplusFL_gdiplus_dll_____X86.3643236F_FC70_11D3_A536_0090278A1BB8");
	writeToFile(this.system32directory() + "/gdiplus.dll", content);
    
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
module.default = class GdiplusWinXPVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "gdiplus (windows xp)", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.gdiplus_winxp();
        wizard.close();
    }
}
