const {mkdir} = include("utils.functions.filesystem.files");

const extractor = Bean("extractor");

const ProcessBuilderClass = Java.type("java.lang.ProcessBuilder");
const FileClass = Java.type("java.io.File");

/**
 * CabExtract class
 */
module.CabExtract = class CabExtract {
    constructor() {
        // do nothing
    }

    /**
     * Sets the setup wizard
     *
     * @param {SetupWizard} wizard The setup wizard
     * @returns {CabExtract} The CabExtract object
     */
    wizard(wizard) {
        this._wizard = wizard;
        return this;
    }

    /**
     * Sets the CAB archive
     *
     * @param {string} archive The CAB archive which shall be extracted
     * @returns {CabExtract} The CabExtract object
     */
    archive(archive) {
        this._archive = archive;
        return this;
    }

    /**
     * Sets the progress message text
     *
     * @param {string} progressMessage The progress message
     * @returns {CabExtract} The CabExtract object
     */
    message(progressMessage) {
        this._progressMessage = progressMessage;
        return this;
    }

    /**
     * Sets the destination for the extracted archive content
     *
     * @param {string} destination The place where the archive shall be extracted
     * @returns {CabExtract} The CabExtract object
     */
    to(destination) {
        this._destination = destination;
        return this;
    }

    /**
     * Extracts the archive to the previously set destination
     *
     * @param {string} args The arguments for the extraction
     * @returns {void}
     */
    extract(args) {
        if (this._wizard) {
            let progressMessage = this._progressMessage;
            if (!progressMessage) {
                progressMessage = tr("Please wait while {0} is extracted...", this._archive);
            }

            this._wizard.progressBar(progressMessage);
        }

        let processArguments;
        if (args) {
            processArguments = ["cabextract"].concat(args).concat([this._archive]);
        } else {
            processArguments = ["cabextract", this._archive];
        }

        print("Extracting to: " + this._destination);
        mkdir(this._destination);

        const process = new ProcessBuilderClass()
            .command(Java.to(processArguments, "java.lang.String[]"))
            .directory(new FileClass(this._destination))
            .inheritIO()
            .start();

        process.waitFor();
    }
}

/**
 * Extractor class
 */
module.Extractor = class Extractor {
    constructor() {
        // nothing to do
    }

    /**
     * Sets the setup wizard
     *
     * @param {SetupWizard} wizard The setup wizard
     * @returns {Extractor} The Extractor object
     */
    wizard(wizard) {
        this._wizard = wizard;
        return this;
    }

    /**
     * Sets the archive
     *
     * @param {string} archive The archive which shall be extracted
     * @returns {Extractor} The Extractor object
     */
    archive(archive) {
        this._archive = archive;
        return this;
    }

    /**
     * Sets the progress message text
     *
     * @param {string} progressMessage The progress message
     * @returns {Extractor} The Extractor object
     */
    message(progressMessage) {
        this._progressMessage = progressMessage;
        return this;
    }

    /**
     * Sets the destination for the extracted archive content
     *
     * @param {string} destination The place where the archive shall be extracted
     * @returns {Extractor} The Extractor object
     */
    to(destination) {
        this._destination = destination;
        return this;
    }

    /**
     * Extracts the archive to the previously set destination
     *
     * @returns {void}
     */
    extract() {
        if (!this._wizard) {
            throw new Error(`No setup wizard specified`);
        }

        let progressMessage = this._progressMessage;
        if (!progressMessage) {
            progressMessage = tr("Please wait while {0} is extracted...", this._archive);
        }

        const progressBar = this._wizard.progressBar(progressMessage);

        mkdir(this._destination);

        extractor.uncompress(this._archive, this._destination, progress => progressBar.accept(progress));
    }
}
