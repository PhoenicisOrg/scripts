include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "filesystem", "files"]);

/**
 * This extensions allows script to add extra settings to dos_support wine builds
 * @returns {Wine} Wine object
 */
Wine.prototype.dosbox = function () {
    var _wine = this;

    /**
     * Fetch the prefix dosbox configuration file
     * @returns {string} The dosbox configuration file path
     */
    this.dosConfigFile = function () {
        return _wine.prefixDirectory() + "/playonlinux_dos.cfg";
    }

    /**
     * Set a setting in the prefix dosbox configuration file
     * @param {string} key The key (example: dosbox_memsize)
     * @param {*} value The value (example: 64)
     * @returns {void}
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
        writeToFile(this.dosConfigFile(), newFileString);
    }

    /**
     * Fetch all prefix dosbox sttings
     * @returns {{}} All the settings
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
    }

    /**
     * Get one dosbox setting
     * @param {string} key The key of the setting (example dosbox_memsize)
     * @returns {*} The value (example: 64)
     */
    this.getSetting = function (key) {
        return this.getSettings()[key];
    }

    /**
     * Set or get one dosbox setting
     * @param {string} key The key of the setting (example dosbox_memsize)
     * @param {string} value: The value to be set
     * @returns {*} The value (example: 64) if this is a getter, the same object otherwise
     */
    this.setting = function (key, value) {
        if (arguments.length == 1) {
            return this.getSettings()[key];
        } else {
            this.setSetting(key, value);
        }
    }

    /**
     * Sets dosbox_memsize parameter in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Bdosbox.5D
     * @param {int} memSize The memory size
     * @returns {string} current memory size
     */
    this.memSize = function (memSize) {
        if (arguments.length == 0) {
            return this.getSetting("dosbox_memsize")
        } else {
            this.setSetting("dosbox_memsize", memSize);
            return this;
        }
    }

    /**
     * Sets render_aspect parameter in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Brender.5D
     * @param {boolean} renderAspect The render aspect
     * @returns {string} current renderAspect
     */
    this.renderAspect = function (renderAspect) {
        if (arguments.length == 0) {
            return this.getSetting("render_aspect")
        } else {
            this.setSetting("render_aspect", renderAspect);
            return this;
        }
    }

    /**
     * Sets render_frameskip parameter in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Brender.5D
     * @param {int} renderFrameSkip The render frameskip
     * @returns {string} current frameskip
     */
    this.renderFrameSkip = function (renderFrameSkip) {
        if (arguments.length == 0) {
            return this.getSetting("render_frameskip")
        } else {
            this.setSetting("render_frameskip", renderFrameSkip);
            return this;
        }
    }

    /**
     * Sets CPU cycles in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Bcpu.5D
     * @param {*} cpuCycles (example: max 95% limit 33000)
     * @returns {string} current cpuCycles
     */
    this.cpuCycles = function (cpuCycles) {
        if (arguments.length == 0) {
            return this.getSetting("cpu_cycles")
        } else {
            this.setSetting("cpu_cycles", cpuCycles);
            return this;
        }
    }

    return this;
}
