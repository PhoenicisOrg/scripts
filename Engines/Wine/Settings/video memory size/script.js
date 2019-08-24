const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * Setting to set the video memory size
 */
// eslint-disable-next-line no-unused-vars
module.default = class VideoMemorySizeSetting {
    constructor() {
        this.options = [tr("Default"), "64", "384", "1024", "4096", "7168"];
        // values which are written into the registry, do not translate!
        this.registryValues = ["", "64", "384", "1024", "4096", "7168"];
    }

    getText() {
        return tr("Video memory size");
    }

    getOptions() {
        return this.options;
    }

    getCurrentOption(container) {
        var currentValue = new Wine()
            .prefix(container)
            .regedit()
            .fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Direct3D", "VideoMemorySize"]);
        // find matching option (use default if not found)
        var index = Math.max(this.registryValues.indexOf(currentValue), 0);
        return this.options[index];
    }

    setOption(container, optionIndex) {
        if (0 == optionIndex) {
            new Wine()
                .prefix(container)
                .regedit()
                .deleteValue("HKEY_CURRENT_USER\\Software\\Wine\\Direct3D", "VideoMemorySize");
        } else {
            var regeditFileContent =
                "REGEDIT4\n" +
                "\n" +
                "[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n" +
                "\"VideoMemorySize\"=\"" + this.registryValues[optionIndex] + "\"\n";
            new Wine()
                .prefix(container)
                .regedit()
                .patch(regeditFileContent);
        }
    }
}
