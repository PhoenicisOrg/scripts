include("engines.wine.engine.object");
include("utils.functions.filesystem.files");
include("utils.functions.net.resource");

/**
 * Verb to install Windows XP Service Pack 3
 *
 * @param {string} fileToExtract path to file which shall be extracted
 * @returns {Wine} Wine object
 */
Wine.prototype.sp3extract = function (fileToExtract) {
    var that = this;
    that._targetDirectory = this.system32directory();

    this.targetDirectory = function (targetDirectory) {
        that._targetDirectory = targetDirectory;
        return that;
    };

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("http://freeware.epsc.wustl.edu/Win/XP_SP3/WindowsXP-KB936929-SP3-x86-ENU.exe")// Just a test, the URL needs to be fixed
        .checksum("c81472f7eeea2eca421e116cd4c03e2300ebfde4")
        .name("WindowsXP-KB936929-SP3-x86-ENU.exe")
        .get();

    new CabExtract()
        .archive(setupFile)
        .wizard(this.wizard())
        .to(this.prefixDirectory() + "/drive_c/sp3/")
        .extract(["-F", "i386/" + fileToExtract.slice(0, -1) + "_"]);

    remove(that._targetDirectory + "/" + fileToExtract);

    new CabExtract()
        .archive(this.prefixDirectory() + "/drive_c/sp3/i386/" + fileToExtract.slice(0, -1) + "_")
        .wizard(this.wizard())
        .to(that._targetDirectory)
        .extract();

    return this;
};

/**
 * Verb to install Windows XP Service Pack 3
 */
// eslint-disable-next-line no-unused-vars
class WindowsXPSP3Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);

        var wizard = SetupWizard(InstallationType.VERBS, "sp3extract", java.util.Optional.empty());

        // query .dll file which shall be extracted
        var fileToExtract = fileName(wizard.browse(tr("Please select the SP3 file."), wine.prefixDirectory(), ["dll"]));
        wine.wizard(wizard);

        // extract requested file
        wine.sp3extract(fileToExtract);

        wizard.close();
    }
}
