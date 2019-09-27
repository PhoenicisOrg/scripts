const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

module.default = class OpenGL {
    constructor(wine) {
        this.wine = wine;
    }

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

        this.wine.regedit().patch(regeditFileContent);
    }
};
