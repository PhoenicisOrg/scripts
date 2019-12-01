const Regedit = include("engines.wine.plugins.regedit");

/**
 * Plugin to set the windows version
 */
module.default = class WindowsVersion {
    constructor(wine) {
        this.wine = wine;
        this.applications = {};
    }

    getWindowsVersion() {
        return new Regedit(this.wine).fetchValue(["HKEY_CURRENT_USER", "Software", "Wine", "Version"]);
    }

    /**
     * Specifies the default windows version
     *
     * @param {string} version win7, vista, win2003, winxp, win2k, winnt, winme, win98, win95, win31
     * @param {string} servicePack e.g. sp3
     * @returns {WindowsVersion} This
     */
    withWindowsVersion(version, servicePack) {
        this.version = version;
        this.servicePack = servicePack;

        return this;
    }

    /**
     * Specifies the windows version for a given application
     * @param {string} application The application executable
     * @param {string} os The windows version
     * @returns {WindowsVersion} This
     */
    withApplicationWindowsVersion(application, os) {
        this.applications[application] = os;

        return this;
    }

    go() {
        let regeditFileContent = `REGEDIT4\n\n[HKEY_CURRENT_USER\\Software\\Wine]\n`;

        // set the global windows version
        if (this.version) {
            regeditFileContent += `"Version"="${this.version}"\n`;

            if (this.servicePack) {
                const servicePackNumber = this.servicePack.replace("sp", "");

                regeditFileContent += `[HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion]\n`;
                regeditFileContent += `"CSDVersion"="Service Pack ${servicePackNumber}"\n`;
                regeditFileContent += `[HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\Windows]\n`;
                regeditFileContent += `"CSDVersion"=dword:00000${servicePackNumber}00\n`;
            }
        } else {
            regeditFileContent += `"Version"=-\n`;
        }

        // set the local windows version
        Object.entries(this.applications).forEach(([application, os]) => {
            regeditFileContent += `[HKEY_CURRENT_USER\\Software\\Wine\\AppDefaults\\${application}]\n`;
            regeditFileContent += `"Version"="${os}"\n`;
        });

        new Regedit(this.wine).patch(regeditFileContent);
    }
};
