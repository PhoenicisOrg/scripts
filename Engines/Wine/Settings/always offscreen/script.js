const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * setting to set always offscreen
 */
// eslint-disable-next-line no-unused-vars
module.default = class AlwaysOffscreenSetting {
    constructor() {
        this.options = [tr("Default"), tr("Disabled"), tr("Enabled")];
        // values which are written into the registry, do not translate!
        this.registryValues = ["", "disabled", "enabled"];
    }

    getText() {
        return tr("Always offscreen");
    }

    getOptions() {
        return this.options;
    }

    getCurrentOption(container) {
        const currentValue = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Direct3D", "AlwaysOffscreen"]);

        // find matching option (use default if not found)
        const index = Math.max(this.registryValues.indexOf(currentValue), 0);

        return this.options[index];
    }

    setOption(container, optionIndex) {
        if (0 == optionIndex) {
            new Wine()
                .prefix(container)
                .regedit()
                .deleteValue("HKEY_CURRENT_USER\\Software\\Wine\\Direct3D", "AlwaysOffscreen");
        } else {
            const regeditFileContent =
                "REGEDIT4\n" +
                "\n" +
                "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
                "\"AlwaysOffscreen\"=\"" + this.registryValues[optionIndex] + "\"\n";
            new Wine()
                .prefix(container)
                .regedit()
                .patch(regeditFileContent);
        }
    }
}
