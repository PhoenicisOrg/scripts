const { writeToFile, fileExists, cat } = include("utils.functions.filesystem.files");

/**
 * Plugin to add extra settings to dos_support wine builds
 */
module.default = class Dosbox {
    constructor(wine) {
        this.wine = wine;
        this.settings = {};
    }

    /**
     * Fetch the prefix dosbox configuration file
     *
     * @returns {string} The dosbox configuration file path
     */
    dosConfigFile() {
        return `${this.wine.prefixDirectory()}/playonlinux_dos.cfg`;
    }

    /**
     * Fetch all prefix dosbox sttings
     *
     * @returns {object} All the settings
     */
    getSettings() {
        if (fileExists(this.dosConfigFile())) {
            const settingResults = {};

            cat(this.dosConfigFile())
                .split("\n")
                .forEach(dosboxSettingLine => {
                    const [key, value] = dosboxSettingLine.split("=");

                    settingResults[key] = value;
                });

            return settingResults;
        } else {
            return {};
        }
    }

    /**
     * Sets a dosbox setting
     *
     * @param {string} key The key of the setting (example dosbox_memsize)
     * @param {any} value The value to be set
     * @returns {Dosbox} This
     */
    withSetting(key, value) {
        this.settings[key] = value;

        return this;
    }

    /**
     * Sets dosbox_memsize parameter in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Bdosbox.5D
     *
     * @param {int} memSize The memory size
     * @returns {Dosbox} This
     */
    withMemSize(memSize) {
        return this.withSetting("dosbox_memsize", memSize);
    }

    /**
     * Sets render_aspect parameter in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Brender.5D
     *
     * @param {boolean} renderAspect The render aspect
     * @returns {Dosbox} This
     */
    withRenderAspect(renderAspect) {
        return this.withSetting("render_aspect", renderAspect);
    }

    /**
     * Sets render_frameskip parameter in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Brender.5D
     *
     * @param {int} renderFrameSkip The render frameskip
     * @returns {Dosbox} This
     */
    withRenderFrameSkip(renderFrameSkip) {
        return this.withSetting("render_frameskip", renderFrameSkip);
    }

    /**
     * Sets CPU cycles in the current prefix
     * https://www.dosbox.com/wiki/dosbox.conf#.5Bcpu.5D
     *
     * @param {int} cpuCycles (example: max 95% limit 33000)
     * @returns {Dosbox} This
     */
    withCpuCycles(cpuCycles) {
        return this.withSetting("cpu_cycles", cpuCycles);
    }

    go() {
        const settingsToWrite = this.getSettings();

        for (const key in this.settings) {
            settingsToWrite[key] = this.settings[key];
        }

        const newFileString = Object.entries(settingsToWrite)
            .filter(([key, value]) => key !== "" && value)
            .map(([key, value]) => `${key}=${value}`)
            .join("\n");

        writeToFile(this.dosConfigFile(), newFileString);
    }
};
