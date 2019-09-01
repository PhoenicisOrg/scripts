const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { remove, fileName } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

/**
 * Verb to install Windows XP Service Pack 3
 */
class WindowsXPSP3 {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Sets the path to the file which shall be extracted
     *
     * @param {string} fileToExtract The path to the file which shall be extracted
     * @returns {WindowsXPSP3} The WindowsXPSP3 object
     */
    withFileToExtract(fileToExtract) {
        this.fileToExtract = fileToExtract;

        return this;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();

        const setupFile = new Resource()
            .wizard(wizard)
            .url("http://freeware.epsc.wustl.edu/Win/XP_SP3/WindowsXP-KB936929-SP3-x86-ENU.exe")
            .checksum("c81472f7eeea2eca421e116cd4c03e2300ebfde4")
            .name("WindowsXP-KB936929-SP3-x86-ENU.exe")
            .get();

        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/drive_c/sp3/`)
            .extract(["-F", `i386/${this.fileToExtract.slice(0, -1)}_`]);

        remove(`${system32directory}/${this.fileToExtract}`);

        new CabExtract()
            .wizard(wizard)
            .archive(`${prefixDirectory}/drive_c/sp3/i386/${this.fileToExtract.slice(0, -1)}_`)
            .to(system32directory)
            .extract();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "sp3extract", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        // query .dll file which shall be extracted
        const fileToExtract = fileName(
            wizard.browse(tr("Please select the SP3 file."), wine.prefixDirectory(), ["dll"])
        );

        // extract requested file
        new WindowsXPSP3(wine).withFileToExtract(fileToExtract).go();

        wizard.close();
    }
}

module.default = WindowsXPSP3;
