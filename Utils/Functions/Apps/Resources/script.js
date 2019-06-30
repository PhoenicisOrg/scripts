/**
 * AppResource class
 */
// eslint-disable-next-line no-unused-vars
class AppResource {
    constructor() {
        this.appsManager = Bean("repositoryManager");
    }

    /**
     * Sets the application containing the resources
     *
     * @param {string} application The application with the resource
     * @returns {AppResource} The AppResource object
     */
    application(application) {
        this._application = this.appsManager.getApplication(application);

        if (!this._application) {
            print(`Warning: unable to fetch application "${application}"`);
        }

        return this;
    }

    /**
     * Returns the searched resource
     *
     * @param {string} resourceName The name of the resource
     * @returns {Resource} The found resource
     */
    get(resourceName) {
        if (!this._application || !this._application.resources) {
            throw new Error(`Unable to fetch resource from "null" application`);
        }

        const foundResource = Java.from(this._application.resources).find(resource => resource.name === resourceName);

        if (!foundResource) {
            throw new Error(`Application "${this._application.name}" does not contain resource "${resourceName}"`);
        }

        return foundResource.content;
    }
}
