/* eslint-disable no-undef */
const { getScreenWidth, getScreenHeight } = include("utils.functions.system.virtual_desktop");

const Regedit = include("engines.wine.plugins.regedit");

/**
 * Plugin to set a Virtual Desktop with window resolution
 */
module.default = class VirtualDesktop {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Specifies the dimensions of the virtual desktop
     *
     * @param {number} width width of virtual desktop (in px)
     * @param {number} height height of virtual desktop (in px)
     * @returns {VirtualDesktop} This
     */
    withDimensions(width, height) {
        this.width = width;
        this.height = height;

        return this;
    }

    fetchDimensions() {
        let width = this.width;
        let height = this.height;

        if (!width) {
            width = getScreenWidth();
        }

        if (!height) {
            height = getScreenHeight();
        }

        return {
            width: width,
            height: height
        };
    }

    go() {
        const { width, height } = this.fetchDimensions();

        const regeditFileContent =
            `REGEDIT4\n\n` +
            `[HKEY_CURRENT_USER\\Software\\Wine\\Explorer\\Desktops]\n` +
            `"Default"="${width}x${height}"\n` +
            `[HKEY_CURRENT_USER\\Software\\Wine\\Explorer]\n` +
            `"Desktop"="Default"\n`;

        new Regedit(this.wine).patch(regeditFileContent);
    }
};
