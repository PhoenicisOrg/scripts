/**
 * A "plain" script installer that is fully configurable.
 */
// eslint-disable-next-line no-unused-vars
class PlainInstaller {
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
        this.command();
    }
}
