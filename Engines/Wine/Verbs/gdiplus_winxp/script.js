const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { remove, cat, writeToFile } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install gdiplus (windows xp)
 *
 * @returns {Wine} Wine object
 */
class GDIPlusWinXP {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();

        const setupFile = new Resource()
            .wizard(wizard)
            .url("https://download.microsoft.com/download/1/4/6/1467c2ba-4d1f-43ad-8d9b-3e8bc1c6ac3d/NDP1.0sp2-KB830348-X86-Enu.exe")
            .checksum("6113cd89d77525958295ccbd73b5fb8b89abd0aa")
            .name("NDP1.0sp2-KB830348-X86-Enu.exe")
            .get();

        new CabExtract()
            .archive(setupFile)
            .wizard(wizard)
            .to(`${prefixDirectory}/drive_c/gdiplus/`)
            .extract(["-F", "FL_gdiplus_dll_____X86.3643236F_FC70_11D3_A536_0090278A1BB8"]);

        new CabExtract()
            .archive(setupFile)
            .wizard(wizard)
            .to(`${prefixDirectory}/drive_c/gdiplus/`)
            .extract(["-L", "-F", "x86_microsoft.windows.gdiplus_6595b64144ccf1df_1.1.7601.17514_none_72d18a4386696c80/gdiplus.dll"]);

        const content = cat(`${prefixDirectory}/drive_c/gdiplus/drive_c/gdiplus/FL_gdiplus_dll_____X86.3643236F_FC70_11D3_A536_0090278A1BB8`);
        writeToFile(`${system32directory}/gdiplus.dll`, content);

        remove(`${prefixDirectory}/drive_c/gdiplus/`);

        this.wine
            .overrideDLL()
            .set("native", ["gdiplus"])
            .do();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "gdiplus (windows xp)", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new GDIPlusWinXP(wine).go();

        wizard.close();
    }
}

module.default = GDIPlusWinXP;
