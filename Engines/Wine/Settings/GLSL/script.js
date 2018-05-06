include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "regedit"]);

/**
 * setting to enable/disable GLSL
*/
var settingImplementation = {
    _options: [tr("Default"), tr("Disabled"), tr("Enabled")],
    // values which are written into the registry, do not translate!
    _registryValues: ["", "disabled", "enabled"],
    getText: function () {
        return tr("GLSL support");
    },
    getOptions: function () {
        return this._options;
    },
    getCurrentOption: function (container) {
        var currentValue = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Direct3D", "UseGLSL"]);
        // find matching option
        var index = this._registryValues.indexOf(currentValue);
        return this._options[index];
    },
    setOption: function (container, optionIndex) {
        var regeditFileContent =
            "REGEDIT4\n" +
            "\n" +
            "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
            "\"UseGLSL\"=\"" + this._registryValues[optionIndex] + "\"\n";
        new Wine()
            .prefix(container)
            .regedit()
            .patch(regeditFileContent);
    }
};

/* exported Setting */
var Setting = Java.extend(org.phoenicis.engines.EngineSetting, settingImplementation);
