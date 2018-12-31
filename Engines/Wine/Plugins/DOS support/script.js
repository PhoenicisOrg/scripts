include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "filesystem", "files"]);

Wine.prototype.dosbox = function () {
    var _wine = this;

    /**
     * Fetch the prefix dosbox configuration file
     * @returns {string}
     */
    this.dosConfigFile = function () {
        return _wine.prefixDirectory() + "/playonlinux_dos.cfg";
    };

    /**
     * Set a setting in the prefix dosbox configuration file
     * @param {string} key The key (example: dosbox_memsize)
     * @param {*} value The value (example: 64)
     */
    this.setSetting = function (key, value) {
        var settingsToWrite = this.getSettings();
        settingsToWrite[key] = value;

        var newFileString = "";
        for (var keyToWrite in settingsToWrite) {
            if (keyToWrite !== "" && settingsToWrite[keyToWrite]) {
                newFileString += keyToWrite + "=" + settingsToWrite[keyToWrite] + "\n"
            }
        }
        return writeToFile(this.dosConfigFile(), newFileString);
    };

    /**
     * Fetch all prefix dosbox sttings
     * @returns {{}}
     */
    this.getSettings = function () {
        if (fileExists(this.dosConfigFile())) {
            var dosboxSettingsContent = cat(this.dosConfigFile());
            var settingResults = {};
            dosboxSettingsContent.split("\n").forEach(function (dosboxSettingLine) {
                var splitDosboxSettingLine = dosboxSettingLine.split("=");
                settingResults[splitDosboxSettingLine[0]] = splitDosboxSettingLine[1];
            });
            return settingResults;
        } else {
            return {};
        }
    };

    /**
     * Get one dosbox setting
     * @param {string} key The key of the setting (example dosbox_memsize)
     * @returns {*} The value (example: 64)
     */
    this.getSetting = function (key) {
        return this.getSettings()[key];
    };

    /**
     * Sets dosbox_memsize parameter in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Bdosbox.5D
     * @param {int} memSize The memory size
     */
    this.setMemsize = function (memSize) {
        this.setSetting("dosbox_memsize", memSize);
        return this;
    };

    /**
     * Sets render_aspect parameter in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Brender.5D
     * @param {boolean} renderAspect The render aspect
     */
    this.setRenderAspect = function (renderAspect) {
        this.setSetting("render_aspect", renderAspect);
        return this;
    };

    /**
     * Sets render_frameskip parameter in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Brender.5D
     * @param {int} renderFrameSkip The render frameskip
     */
    this.setRenderFrameSkip = function (renderFrameSkip) {
        this.setSetting("render_frameskip", renderFrameSkip);
        return this;
    };

    /**
     * Sets CPU cycles in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Bcpu.5D
     * @param {*} cpu_cycles (example: max 95% limit 33000)
     */
    this.setCPUCycles = function (cpu_cycles) {
        this.setSetting("cpu_cycles", cpu_cycles);
        return this;
    };

    return this;
}

