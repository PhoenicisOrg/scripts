const Regedit = include("engines.wine.plugins.regedit");

module.default = class OpenGL {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Specifies the major and minor versions
     *
     * @param {number} major The major version
     * @param {number} minor The minor version
     * @returns {OpenGL} This
     */
    withVersion(major, minor) {
        this.major = major;
        this.minor = minor;

        return this;
    }

    go() {
        const regeditFileContent =
            `REGEDIT4\n\n` +
            `[HKEY_CURRENT_USER\\Software\\Wine\\Direct3D]\n` +
            `"MaxVersionGL"=dword:000${this.major}000${this.minor}`;

        new Regedit(this.wine).patch(regeditFileContent);
    }
};
