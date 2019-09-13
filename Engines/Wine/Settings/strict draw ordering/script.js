const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * Setting to configure strict draw ordering
 */
// eslint-disable-next-line no-unused-vars
module.default = class StrictDrawOrderingSetting {
    constructor() {
        this.options = [tr("Default"), tr("Disabled"), tr("Enabled")];
        // values which are written into the registry, do not translate!
        this.registryValues = ["", "disabled", "enabled"];
    }

    getText() {
        return tr("Strict Draw Ordering");
    }

    getOptions() {
        return this.options;
    }

    getCurrentOption(container) {
        var currentValue = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Direct3D", "StrictDrawOrdering"]);
        // find matching option (use default if not found)
        var index = Math.max(this.registryValues.indexOf(currentValue), 0);
        return this.options[index];
    }

    setOption(container, optionIndex) {
        if (0 == optionIndex) {
            new Wine()
                .prefix(container)
                .regedit()
                .deleteValue("HKEY_CURRENT_USER\\Software\\Wine\\Direct3D", "StrictDrawOrdering");
        } else {
            var regeditFileContent =
                "REGEDIT4\n" +
                "\n" +
                "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
                "\"StrictDrawOrdering\"=\"" + this.registryValues[optionIndex] + "\"\n";
            new Wine()
                .prefix(container)
                .regedit()
                .patch(regeditFileContent);
        }
    }
}
