const Regedit = include("engines.wine.plugins.regedit");

module.default = class OverrideDLL {
    constructor(wine) {
        this.wine = wine;
        this.modes = new Map();
    }

    withMode(mode, libraries) {
        this.modes.set(mode, libraries);

        return this;
    }

    go() {
        let regeditFileContent = `REGEDIT4\n\n[HKEY_CURRENT_USER\\Software\\Wine\\DllOverrides]\n`;

        this.modes.forEach((libraries, mode) =>
            libraries.forEach(library => regeditFileContent += `"*${library}"="${mode}"\n`)
        );

        new Regedit(this.wine).patch(regeditFileContent);
    }
};
