const Wine = include("engines.wine.engine.object");

const Regedit = include("engines.wine.plugins.regedit");

/**
 * Setting to enable/disable GLSL
 */
// eslint-disable-next-line no-unused-vars
module.default = class GLSLSetting {
    constructor() {
        this.options = [tr("Default"), tr("Disabled"), tr("Enabled")];
        // values which are written into the registry, do not translate!
        this.registryValues = ["", "disabled", "enabled"];
    }

    getText() {
        return tr("GLSL support");
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
            "UseGLSL"
        ]);

        // find matching option (use default if not found)
        const index = Math.max(this.registryValues.indexOf(currentValue), 0);

        return this.options[index];
    }

    setOption(container, optionIndex) {
        const wine = new Wine().prefix(container);

        if (0 == optionIndex) {
            new Regedit(wine).deleteValue("HKEY_CURRENT_USER\\Software\\Wine\\Direct3D", "UseGLSL");
        } else {
            const regeditFileContent =
                "REGEDIT4\n" +
                "\n" +
                "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
                '"UseGLSL"="' +
                this.registryValues[optionIndex] +
                '"\n';

            new Regedit(wine).patch(regeditFileContent);
        }
    }
};
