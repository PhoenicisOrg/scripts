const Downloader = include("utils.functions.net.download");
const {mkdir, fileExists, Checksum} = include("utils.functions.filesystem.files");

const propertyReader = Bean("propertyReader");

/**
 * Resource class
 */
module.default = class Resource {
    constructor() {
        this._resourcesPath = propertyReader.getProperty("application.user.resources");
        this._algorithm = "SHA";
        this._directory = "";
    }

    /**
     * Sets the setup wizard
     *
     * @param {SetupWizard} wizard The setup wizard
     * @returns {Resource} The Resource object
     */
    wizard(wizard) {
        this._wizard = wizard;
        return this;
    }

    /**
     * Sets the checksum algorithm
     *
     * @param {string} algorithm The algorithm to verify the checksum (e.g. "SHA")
     * @returns {Resource} The Resource object
     */
    algorithm(algorithm) {
        this._algorithm = algorithm;
        return this;
    }

    /**
     * Sets the resource name
     *
     * @param {string} name The name of the resource
     * @returns {Resource} The Resource object
     */
    name(name) {
        this._name = name;
        return this;
    }

    /**
     * Sets the checksum which shall be used to verify the resource
     *
     * @param {string} checksum The checksum
     * @returns {Resource} The Resource object
     */
    checksum(checksum) {
        this._checksum = checksum;
        return this;
    }

    /**
     * Sets the resource URL
     *
     * @param {string} url The URL
     * @returns {Resource} The Resource object
     */
    url(url) {
        this._url = url;
        return this;
    }

    /**
     * Sets the directory inside the resources directory where the Resource is stored
     *
     * @param {string} directory The directory path
     * @returns {Resource} The Resource object
     */
    directory(directory) {
        this._directory = directory;
        return this;
    }

    /**
     * Fetches the Resource and returns the path leading to the downloaded resource
     *
     * @returns {string} The path leading to the downloaded resource
     */
    get() {
        if (!this._message) {
            this._message = tr("Please wait while {0} is downloaded...", this._name);
        }

        const resourcesPath = this._resourcesPath + "/" + this._directory;

        mkdir(resourcesPath);

        const resourcePath = resourcesPath + "/" + this._name;

        if (fileExists(resourcePath)) {
            const fileChecksum = new Checksum()
                .wizard(this._wizard)
                .of(resourcePath)
                .method(this._algorithm)
                .get();

            if (fileChecksum === this._checksum) {
                return resourcePath;
            }
        }

        new Downloader()
            .url(this._url)
            .wizard(this._wizard)
            .message(this._message)
            .checksum(this._checksum)
            .algorithm(this._algorithm)
            .to(resourcePath)
            .get();

        return resourcePath;
    }
}
