const Wine = include("engines.wine.engine.object");

const Regedit = include("engines.wine.plugins.regedit");

/**
 * Setting to set the render target lock mode
 */
// eslint-disable-next-line no-unused-vars
module.default = class RenderTargetModeLockSetting {
    constructor() {
        this.options = [tr("Default"), tr("Disabled"), tr("readdraw"), tr("readtext")];
        // values which are written into the registry, do not translate!
        this.registryValues = ["", "disabled", "readdraw", "readtext"];
    }

    getText() {
        return tr("Render target lock mode");
    }

    getOptions() {
        return this.options;
    }

    getCurrentOption(container) {
        const wine = new Wine().prefix(container);

        var currentValue = new Regedit(wine).fetchValue([
            "HKEY_CURRENT_USER",
            "Software",
            "Wine",
            "Direct3D",
            "RenderTargetModeLock"
        ]);

        // find matching option (use default if not found)
        const index = Math.max(this.registryValues.indexOf(currentValue), 0);

        return this.options[index];
    }

    setOption(container, optionIndex) {
        const wine = new Wine().prefix(container);

        if (0 == optionIndex) {
            new Regedit(wine).deleteValue("HKEY_CURRENT_USER\\Software\\Wine\\Direct3D", "RenderTargetModeLock");
        } else {
            const regeditFileContent =
                "REGEDIT4\n" +
                "\n" +
                "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
                '"RenderTargetModeLock"="' +
                this.registryValues[optionIndex] +
                '"\n';

            new Regedit(wine).patch(regeditFileContent);
        }
    }
};
