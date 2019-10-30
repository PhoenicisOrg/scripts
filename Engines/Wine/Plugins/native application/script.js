const Regedit = include("engines.wine.plugins.regedit");

/**
 * Plugin to use native application for a certain file extension
 */
module.default = class NativeApplication {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Specifies the file extension
     *
     * @param {string} extension The file extension (pdf, txt, rtf)
     * @returns {NativeApplication} This
     */
    withExtension(extension) {
        this.extension = extension;

        return this;
    }

    fetchMimetype() {
        switch (this.extension) {
            case "pdf":
                return "application/pdf";
            case "txt":
                return "application/plain";
            case "rtf":
                return "application/rtf";
            default:
                throw new Error(tr('Could not determine mimetype for file extension "{0}"', this.extension));
        }
    }

    go() {
        const mimetype = this.fetchMimetype();

        const regeditFileContent =
            `REGEDIT4\n\n` +
            `[HKEY_CLASSES_ROOT\\.${this.extension}]\n` +
            `@="${this.extension}file"\n` +
            `"Content Type"="${mimetype}"\n` +
            `[HKEY_CLASSES_ROOT\\${this.extension}file\\Shell\\Open\\command]\n` +
            `@="winebrowser "%1""`;

        new Regedit(this.wine).patch(regeditFileContent);
    }
};
