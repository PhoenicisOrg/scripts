const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.regedit");

/**
 * use native application for a certain file extension
 * @param {string} [extension] file extension (pdf, txt, rtf)
 * @returns {string|Wine} get: native application, set: Wine object
 */
Wine.prototype.nativeApplication = function (extension) {
    // FIXME: get
    if (arguments.length == 0) {
        return this.regedit().fetchValue(["HKEY_CLASSES_ROOT", "." + extension]);
    }

    // set
    var mimetype = null;
    switch (extension) {
        case "pdf":
            mimetype = "application/pdf";
            break;
        case "txt":
            mimetype = "application/plain";
            break;
        case "rtf":
            mimetype = "application/rtf";
            break;
        default:
            throw tr("Could not determine mimetype for file extension \"{0}\"", extension);
    }
    var regeditFileContent =
        "REGEDIT4\n" +
        "\n" +
        "[HKEY_CLASSES_ROOT\\." + extension + "]\n" +
        "@=\"" + extension + "file\"\n" +
        "\"Content Type\"=\"" + mimetype + "\"\n" +
        "[HKEY_CLASSES_ROOT\\" + extension + "file\\Shell\\Open\\command]\n" +
        "@=\"winebrowser \"%1\"\"";
    this.regedit().patch(regeditFileContent);
    return this;
};