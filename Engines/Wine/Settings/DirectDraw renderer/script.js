const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * setting to set the DirectDraw renderer
 */
// eslint-disable-next-line no-unused-vars
module.default = class DirectDrawRendererSetting {
    constructor() {
        this.options = [tr("Default"), tr("GDI"), tr("OpenGL")];
        // values which are written into the registry, do not translate!
        this.registryValues = ["", "gdi", "opengl"];
    }

    getText() {
        return tr("DirectDraw renderer");
    }

    getOptions() {
        return this.options;
    }

    getCurrentOption(container) {
        var currentValue = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Direct3D", "DirectDrawRenderer"]);
        // find matching option (use default if not found)
        var index = Math.max(this.registryValues.indexOf(currentValue), 0);

        return this.options[index];
    }

    setOption(container, optionIndex) {
        if (0 == optionIndex) {
            new Wine()
                .prefix(container)
                .regedit()
                .deleteValue("HKEY_CURRENT_USER\\Software\\Wine\\Direct3D", "DirectDrawRenderer");
        } else {
            var regeditFileContent =
                "REGEDIT4\n" +
                "\n" +
                "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
                "\"DirectDrawRenderer\"=\"" + this.registryValues[optionIndex] + "\"\n";
            new Wine()
                .prefix(container)
                .regedit()
                .patch(regeditFileContent);
        }
    }
}
