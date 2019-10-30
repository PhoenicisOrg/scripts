const {Checksum} = include("utils.functions.filesystem.files");

const downloader = Bean("downloader");

/**
 * Downloader class
 */
module.default = class Downloader {
    constructor() {
        this._algorithm = "SHA";
        this._headers = {};
    }

    /**
     * Fetches the file name from an URL
     *
     * @param {string} url The URL
     * @returns {string} The file name
     */
    _fetchFileNameFromUrl(url) {
        return url.substring(url.lastIndexOf("/") + 1);
    }

    /**
     * Sets the setup wizard
     *
     * @param {SetupWizard} wizard The setup wizard
     * @returns {Downloader} The Downloader object
     */
    wizard(wizard) {
        this._wizard = wizard;
        return this;
    }

    /**
     * Sets the URL which shall be used for the download
     *
     * @param {string} url The URL
     * @returns {Downloader} The Downloader object
     */
    url(url) {
        this._url = url;
        return this;
    }

    /**
     * Sets the algorithm which shall be used to verify the checksum
     *
     * @param {string} algorithm The checksum algorithm (e.g. "SHA")
     * @returns {Downloader} The Downloader object
     */
    algorithm(algorithm) {
        this._algorithm = algorithm;
        return this;
    }

    /**
     * Sets the checksum
     *
     * @param {string} checksum The checksum which shall be used to verify the download
     * @returns {Downloader} The Downloader object
     */
    checksum(checksum) {
        this._checksum = checksum;
        return this;
    }

    /**
     * Sets the download message text
     *
     * @param {string} message The download message
     * @returns {Downloader} The Downloader object
     */
    message(message) {
        this._message = message;
        return this;
    }

    /**
     * Sets the http headers
     *
     * @param {{}} headers The http headers
     * @returns {Downloader} The Downloader object
     */
    headers(headers) {
        this._headers = headers;
        return this;
    }

    /**
     * Sets the download destination
     *
     * @param {string} localDestination The destination of the download. If it is a directory, the file will be placed inside
     * @returns {Downloader} The Downloader object
     */
    to(localDestination) {
        this._localDestination = localDestination;
        return this;
    }

    /**
     * Specifies if the download shall be executed only if a newer version is available
     *
     * @param {boolean} onlyIfUpdateAvailable true the download shall be executed only if a newer version is available
     * @returns {Downloader} The Downloader object
     */
    onlyIfUpdateAvailable(onlyIfUpdateAvailable) {
        this._onlyIfUpdateAvailable = onlyIfUpdateAvailable;
        return this;
    }

    /**
     * Gets the content of the downloaded file
     *
     * @returns {String} The content of downloaded file
     */
    get() {
        if (!this._message) {
            this._message = tr("Please wait while {0} is downloaded...", this._fetchFileNameFromUrl(this._url));
        }

        let progressBar;
        if (this._wizard) {
            progressBar = this._wizard.progressBar(this._message);
        }

        if (this._onlyIfUpdateAvailable) {
            if (!downloader.isUpdateAvailable(this._localDestination, this._url)) {
                print(this._localDestination + " already up-to-date.");
                return;
            }
        }

        if (this._localDestination) {
            const downloadFile = downloader.get(
                this._url,
                this._localDestination,
                this._headers,
                progressEntity => {
                    if (progressBar) {
                        progressBar.accept(progressEntity);
                    }
                }
            );

            if (this._checksum) {
                const fileChecksum = new Checksum()
                    .wizard(this._wizard)
                    .of(this._localDestination)
                    .method(this._algorithm)
                    .get();

                if (fileChecksum != this._checksum) {
                    const checksumErrorMessage = tr(
                        'Error while calculating checksum for "{0}". \n\nExpected = {1}\nActual = {2}',
                        this._localDestination,
                        this._checksum,
                        fileChecksum
                    );

                    this._wizard.message(checksumErrorMessage);

                    throw new Error(checksumErrorMessage);
                }
            }

            return downloadFile.toString();
        } else {
            return downloader.get(this._url, this._headers, progressEntity => {
                if (progressBar) {
                    progressBar.accept(progressEntity);
                }
            });
        }
    }

    /**
     * Gets the content of the downloaded file and returns it as a JSON value
     *
     * @returns {any} The json value
     */
    json() {
        return JSON.parse(this.get());
    }
}
