include("engines.wine.engine.object");
include("engines.wine.plugins.regedit");
include("engines.wine.plugins.usetakefocus");

/**
 * setting to enable/disable UseTakeFocus
*/
var settingImplementation = {
    _options: [tr("Default"), tr("Disabled"), tr("Enabled")],
    // values which are written into the registry, do not translate!
    _registryValues: ["", "N", "Y"], // `Y` is blind code since it's enabled by default on wine-staging it seems
    getText: function () {
        return tr("UseTakeFocus");
    },
    getOptions: function () {
        return this._options;
    },
    getCurrentOption: function (container) {
        var currentValue = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "X11 Driver", "UseTakeFocus"]);
        // find matching option (use default if not found)
        var index = Math.max(this._registryValues.indexOf(currentValue), 0);
        return this._options[index];
    },
    setOption: function (container, optionIndex) {
        if (0 == optionIndex) {
            new Wine()
                .prefix(container)
                .regedit()
                .deleteValue("HKEY_CURRENT_USER\\Software\\Wine\\X11 Driver", "UseTakeFocus");
        }
        else {
            new Wine()
                .prefix(container)
                .UseTakeFocus(this._registryValues[optionIndex]);
        }
    }
};

/* exported Setting */
var Setting = Java.extend(org.phoenicis.engines.EngineSetting, settingImplementation);
