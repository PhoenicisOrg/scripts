include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "regedit"]);

/**
 * setting to set the render target lock mode
*/
var settingImplementation = {
    _options: [tr("Default"), tr("Disabled"), tr("readdraw"), tr("readtext")],
    // values which are written into the registry, do not translate!
    _registryValues: ["", "disabled", "readdraw", "readtext"],
    getText: function () {
        return tr("Render target lock mode");
    },
    getOptions: function () {
        return this._options;
    },
    getCurrentOption: function (container) {
        var currentValue = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Direct3D", "RenderTargetModeLock"]);
        // find matching option (use default if not found)
        var index = Math.max(this._registryValues.indexOf(currentValue), 0);
        return this._options[index];
    },
    setOption: function (container, optionIndex) {
        var regeditFileContent =
            "REGEDIT4\n" +
            "\n" +
            "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
            "\"RenderTargetModeLock\"=\"" + this._registryValues[optionIndex] + "\"\n";
        new Wine()
            .prefix(container)
            .regedit()
            .patch(regeditFileContent);
    }
};

/* exported Setting */
var Setting = Java.extend(org.phoenicis.engines.EngineSetting, settingImplementation);
