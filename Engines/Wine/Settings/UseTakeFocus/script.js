const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");
include("engines.wine.plugins.usetakefocus");

/**
 * Setting to enable/disable UseTakeFocus
 */
// eslint-disable-next-line no-unused-vars
module.default = class UseTakeFocusSetting {
    constructor() {
        this.options = [tr("Default"), tr("Disabled"), tr("Enabled")];
        // values which are written into the registry, do not translate!
        // `Y` is blind code since it's enabled by default on wine-staging it seems
        this.registryValues = ["", "N", "Y"];
    }

    getText() {
        return tr("UseTakeFocus");
    }

    getOptions() {
        return this.options;
    }

    getCurrentOption(container) {
        var currentValue = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "X11 Driver", "UseTakeFocus"]);
        // find matching option (use default if not found)
        var index = Math.max(this.registryValues.indexOf(currentValue), 0);
        return this.options[index];
    }

    setOption(container, optionIndex) {
        if (0 == optionIndex) {
            new Wine()
                .prefix(container)
                .regedit()
                .deleteValue("HKEY_CURRENT_USER\\Software\\Wine\\X11 Driver", "UseTakeFocus");
        } else {
            new Wine()
                .prefix(container)
                .UseTakeFocus(this.registryValues[optionIndex]);
        }
    }
}
