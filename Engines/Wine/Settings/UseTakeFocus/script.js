const Wine = include("engines.wine.engine.object");

const Regedit = include("engines.wine.plugins.regedit");
const TakeFocus = include("engines.wine.plugins.usetakefocus");

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
        const wine = new Wine().prefix(container);

        const currentValue = new Regedit(wine).fetchValue([
            "HKEY_CURRENT_USER",
            "Software",
            "Wine",
            "X11 Driver",
            "UseTakeFocus"
        ]);

        // find matching option (use default if not found)
        const index = Math.max(this.registryValues.indexOf(currentValue), 0);

        return this.options[index];
    }

    setOption(container, optionIndex) {
        const wine = new Wine().prefix(container);

        if (0 == optionIndex) {
            new Regedit(wine).deleteValue("HKEY_CURRENT_USER\\Software\\Wine\\X11 Driver", "UseTakeFocus");
        } else {
            new TakeFocus(wine).withMode(this.registryValues[optionIndex]).go();
        }
    }
};
