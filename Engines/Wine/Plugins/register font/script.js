const Regedit = include("engines.wine.plugins.regedit");

module.default = class RegisterFont {
    constructor(wine) {
        this.wine = wine;
        this.fonts = {};
    }

    withFont(font, file) {
        this.fonts[font] = file;

        return this;
    }

    go() {
        let regeditFileContentNT = `REGEDIT4\n\n[HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Fonts]\n`;
        let regeditFileContent = `REGEDIT4\n\n[HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows\\CurrentVersion\\Fonts]\n`;

        Object.entries(this.fonts).forEach(([font, file]) => {
            regeditFileContentNT += `"*${font}"="${file}"\n`;
            regeditFileContent += `"*${font}"="${file}"\n`;
        });

        new Regedit(this.wine).patch(regeditFileContentNT);
        new Regedit(this.wine).patch(regeditFileContent);
    }
};
