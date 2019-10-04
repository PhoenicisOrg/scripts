/**
 * A "plain" script installer that is fully configurable.
 */
module.default = class PlainInstaller {
    constructor() {
        // do nothing
    }

    /**
     * Sets the installation script consisting of a lambda function
     *
     * @param {function} command The installation command
     * @returns {PlainInstaller} The PlainInstaller object
     */
    withScript(command) {
        this.command = command;
        return this;
    }

    go() {
        if (!this.command) {
            throw new Error(`No command provided to "PlainInstaller"`);
        }

        this.command();
    }
}
