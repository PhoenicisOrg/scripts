const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install D3DX11
 */
class D3DX11 {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Extracts DirectX11 to the system directory
     *
     * @param {*} progressBar The progress bar
     * @param {*} filesToExtract A list of files to extract
     * @param {*} destination The destination folder
     * @param {*} pattern The file pattern used during extraction
     * @returns {void}
     */
    extractDirectXToSystemDirectory(progressBar, filesToExtract, destination, pattern) {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();

        filesToExtract.reduce((numberOfExtractedFiles, cabFile) => {
            print(tr("Extracting {0}...", cabFile));

            progressBar.setText(tr("Extracting {0}...", "DirectX 11"));
            progressBar.setProgressPercentage((numberOfExtractedFiles * 100) / filesToExtract.length);

            new CabExtract()
                .wizard(wizard)
                .archive(`${prefixDirectory}/drive_c/d3dx11/${cabFile}`)
                .to(destination)
                .extract(["-L", "-F", pattern]);

            return numberOfExtractedFiles + 1;
        }, 0);
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();
        const architecture = this.wine.architecture();

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "http://download.microsoft.com/download/8/4/A/84A35BF1-DAFE-4AE8-82AF-AD2AE20B6B14/directx_Jun2010_redist.exe"
            )
            .checksum("7c1fc2021cf57fed3c25c9b03cd0c31a")
            .algorithm("MD5")
            .name("directx_Jun2010_redist.exe")
            .get();

        const progressBar = wizard.progressBar(tr("Please wait..."));
        progressBar.setText(tr("Extracting {0}...", "DirectX 11"));
        progressBar.setProgressPercentage(0);

        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/drive_c/d3dx11/`)
            .extract(["-L", "-F", "*d3dx11*x86*"]);

        const filesToExtractx86 = ["Aug2009_d3dx11_42_x86.cab", "Jun2010_d3dx11_43_x86.cab"];

        this.extractDirectXToSystemDirectory(progressBar, filesToExtractx86, system32directory, "*.dll");

        if (architecture == "amd64") {
            const system64directory = this.wine.system64directory();

            new CabExtract()
                .wizard(wizard)
                .archive(setupFile)
                .to(`${prefixDirectory}/drive_c/d3dx11/`)
                .extract(["-L", "-F", "*d3dx11*x64*"]);

            const filesToExtractx64 = [
                "Aug2009_d3dx11_42_x86.cab",
                "Jun2010_d3dx11_43_x86.cab",
                "Aug2009_d3dx11_42_x64.cab",
                "Jun2010_d3dx11_43_x64.cab"
            ];

            this.extractDirectXToSystemDirectory(progressBar, filesToExtractx64, system64directory, "*.dll");
        }

        this.wine
            .overrideDLL()
            .set("native, builtin", ["d3dx11_42", "d3dx11_43"])
            .do();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "d3dx11", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new D3DX11(wine).go();

        wizard.close();
    }
}

module.default = D3DX11;
