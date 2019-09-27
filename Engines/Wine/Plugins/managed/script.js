const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * Plugin to set the managed state
 *
 * @param {boolean} [managed] true if it shall be managed
 * @returns {boolean|Wine} get: if is managed, set: Wine object
 */
module.default = class Managed {
    constructor(wine) {
        this.wine = wine;
        this.applications = {};
    }

    /**
     * Specifies the global managed state
     *
     * @param {boolean} managed True if it shall be managed
     * @returns {Managed} This
     */
    withManaged(managed) {
        this.managed = managed;

        return this;
    }

    /**
     * Specifies the managed state for a given application
     * @param {string} application The application
     * @param {boolean} managed True if the application shall be managed
     */
    withManagedApplication(application, managed) {
        this.applications[application] = managed;

        return this;
    }

    go() {
        let regeditFileContent = `REGEDIT4\n\n[HKEY_CURRENT_USER\\Software\\Wine\\X11 Driver]\n`;

        // apply global managed
        if (this.managed) {
            const globalYN = this.managed ? "Y" : "N";

            regeditFileContent += `"Managed"="${globalYN}"\n`;
        }

        // apply managed for single applications
        Object.entries(this.applications).forEach(([application, value]) => {
            const localYN = value ? "Y" : "N";

            regeditFileContent +=
                `[HKEY_CURRENT_USER\\Software\\Wine\\AppDefaults\\${application}\\X11 Driver]\n` +
                `"Managed"="${localYN}"\n`;
        });

        this.wine.regedit().patch(regeditFileContent);
    }
};
