const Regedit = include("engines.wine.plugins.regedit");

module.default = class OverrideDLL {
    constructor(wine) {
        this.wine = wine;
        this.modes = {};
    }

    withMode(mode, libraries) {
        this.modes[mode] = libraries;

        return this;
    }

    go() {
        let regeditFileContent = `REGEDIT4\n\n[HKEY_CURRENT_USER\\Software\\Wine\\DllOverrides]\n`;

        Object.entries(this.modes)
            .map(([mode, libraries]) => libraries.map(library => [library, mode]))
            .forEach(([library, mode]) => {
                regeditFileContent += `"*${library}"="${mode}"\n`;
            });

        new Regedit(this.wine).patch(regeditFileContent);
    }
};
