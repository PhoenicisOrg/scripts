const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { remove, fileName } = include("utils.functions.filesystem.files");

/**
 * Verb to install Windows XP Service Pack 3
 *
 * @param {string} fileToExtract path to file which shall be extracted
 * @returns {Wine} Wine object
 */
Wine.prototype.sp3extract = function (fileToExtract) {
    const targetDirectory = this.system32directory();

    const setupFile = new Resource()
        .wizard(this.wizard())
        .url("http://freeware.epsc.wustl.edu/Win/XP_SP3/WindowsXP-KB936929-SP3-x86-ENU.exe")
        .checksum("c81472f7eeea2eca421e116cd4c03e2300ebfde4")
        .name("WindowsXP-KB936929-SP3-x86-ENU.exe")
        .get();

    new CabExtract()
        .archive(setupFile)
        .wizard(this.wizard())
        .to(this.prefixDirectory() + "/drive_c/sp3/")
        .extract(["-F", "i386/" + fileToExtract.slice(0, -1) + "_"]);

    remove(targetDirectory + "/" + fileToExtract);

    new CabExtract()
        .archive(this.prefixDirectory() + "/drive_c/sp3/i386/" + fileToExtract.slice(0, -1) + "_")
        .wizard(this.wizard())
        .to(targetDirectory)
        .extract();

    return this;
};

/**
 * Verb to install Windows XP Service Pack 3
 */
module.default = class WindowsXPSP3Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        const wine = new Wine();

        wine.prefix(container);

        const wizard = SetupWizard(InstallationType.VERBS, "sp3extract", java.util.Optional.empty());

        wine.wizard(wizard);

        // query .dll file which shall be extracted
        const fileToExtract = fileName(
            wizard.browse(tr("Please select the SP3 file."), wine.prefixDirectory(), ["dll"])
        );

        // extract requested file
        wine.sp3extract(fileToExtract);

        wizard.close();
    }
};
