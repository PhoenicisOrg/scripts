include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "regedit"]);

/**
 * setting to enable/disable GLSL
*/
var settingImplementation = {
    getText: function () {
        return tr("GLSL support");
    },
    getOptions: function () {
        // TODO: handle translations
        return ["default", "disabled", "enabled"];
    },
    getCurrentOption: function () {
        // TODO: get from registry
        return "default";
    },
    setOption: function (container, option) {
        var regeditFileContent =
            "REGEDIT4\n" +
            "\n" +
            "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
            "\"UseGLSL\"=\"" + option + "\"\n";
        new Wine()
            .prefix(container)
            .regedit()
            .patch(regeditFileContent);
    }
};

/* exported Setting */
var Setting = Java.extend(org.phoenicis.engines.EngineSetting, settingImplementation);
