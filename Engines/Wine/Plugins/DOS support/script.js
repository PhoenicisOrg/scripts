include(["engines", "wine", "engine", "object"]);
include(["utils", "functions", "filesystem", "files"]);

/**
 * Fetch the prefix dosbox configuration file
 * @returns {string}
 */
Wine.prototype.dosConfigFile = function() {
    return this.prefixDirectory() + "/playonlinux_dos.cfg";
};

/**
 * Set a setting in the prefix dosbox configuration file
 * @param key The key (example: dosbox_memsize)
 * @param value The value (example: 64)
 */
Wine.prototype.dosbox_setSetting = function (key, value) {
    var settingsToWrite = this.dosbox_getSettings();
    settingsToWrite[key] = value;

    var newFileString = "";
    for (var keyToWrite in settingsToWrite){
        if(keyToWrite !== "" && settingsToWrite[keyToWrite]) {
            newFileString += keyToWrite + "=" + settingsToWrite[keyToWrite] + "\n"
        }
    }
    return writeToFile(this.dosConfigFile(), newFileString);
};

/**
 * Fetch all prefix dosbox sttings
 * @returns {{}}
 */
Wine.prototype.dosbox_getSettings = function () {
    if(fileExists(this.dosConfigFile())) {
        var dosboxSettingsContent = cat(this.dosConfigFile());
        var settingResults = {};
        dosboxSettingsContent.split("\n").forEach(function(dosboxSettingLine) {
            splitDosboxSettingLine = dosboxSettingLine.split("=");
            settingResults[splitDosboxSettingLine[0]] = splitDosboxSettingLine[1];
        });
        return settingResults;
    } else {
        return {};
    }
};

/**
 * Get one dosbox setting
 * @param key The key of the setting (example dosbox_memsize)
 * @returns {*} The value (example: 64)
 */
Wine.prototype.dosbox_getSetting = function (key) {
    return this.dosbox_getSettings()[key];
};

/**
 * Sets dosbox_memsize parameter in the current prefix
 * https://www.dosbox.com/wiki/dosbox.conf#.5Bdosbox.5D
 * @param memSize
 */
Wine.prototype.dosbox_setMemsize = function(memSize) {
    this.dosbox_setSetting("dosbox_memsize", memSize)
};

/**
 * Sets render_aspect parameter in the current prefix
 * https://www.dosbox.com/wiki/dosbox.conf#.5Brender.5D
 * @param renderAspect
 */
Wine.prototype.dosbox_setRenderAspect = function(renderAspect) {
    this.dosbox_setSetting("render_aspect", renderAspect)
};

/**
 * Sets render_frameskip parameter in the current prefix
 * https://www.dosbox.com/wiki/dosbox.conf#.5Brender.5D
 * @param renderFrameSkip
 */
Wine.prototype.dosbox_setRenderFrameskip = function(renderFrameSkip) {
    this.dosbox_setSetting("render_frameskip", renderFrameSkip)
};

/**
 * Sets CPU cycles in the current prefix
 * https://www.dosbox.com/wiki/dosbox.conf#.5Bcpu.5D
 * @param cpu_cycles (example: max 95% limit 33000)
 */
Wine.prototype.dosbox_setCPUCycles = function(cpu_cycles) {
    this.dosbox_setSetting("cpu_cycles", cpu_cycles)
};