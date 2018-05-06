include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "regedit"]);

/**
 * setting to set the DirectDraw renderer
*/
var settingImplementation = {
    _options: [tr("Default"), tr("GDI"), tr("OpenGL")],
    // values which are written into the registry, do not translate!
    _registryValues: ["", "gdi", "opengl"],
    getText: function () {
        return tr("DirectDraw renderer");
    },
    getOptions: function () {
        return this._options;
    },
    getCurrentOption: function (container) {
        var currentValue = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Direct3D", "DirectDrawRenderer"]);
        // find matching option
        var index = this._registryValues.indexOf(currentValue);
        return this._options[index];
    },
    setOption: function (container, optionIndex) {
        var regeditFileContent =
            "REGEDIT4\n" +
            "\n" +
            "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
            "\"DirectDrawRenderer\"=\"" + this._registryValues[optionIndex] + "\"\n";
        new Wine()
            .prefix(container)
            .regedit()
            .patch(regeditFileContent);
    }
};

/* exported Setting */
var Setting = Java.extend(org.phoenicis.engines.EngineSetting, settingImplementation);
