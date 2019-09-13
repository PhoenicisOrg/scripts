const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install D3DX10
 */
class D3DX10 {
    constructor(wine) {
        this.wine = wine;
    }

    /**
     * Extracts DirectX10 to the system directory
     *
     * @param {*} progressBar The progress bar
     * @param {*} filesToExtract A list of files to be extracted
     * @param {*} destination The destination folder
     * @param {*} pattern The file pattern used during extraction
     * @returns {void}
     */
    extractDirectXToSystemDirectory(progressBar, filesToExtract, destination, pattern) {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();

        filesToExtract.reduce((numberOfExtractedFiles, cabFile) => {
            print(tr("Extracting {0}...", cabFile));

            progressBar.setText(tr("Extracting {0}...", "DirectX 10"));
            progressBar.setProgressPercentage((numberOfExtractedFiles * 100) / filesToExtract.length);

            new CabExtract()
                .wizard(wizard)
                .archive(`${prefixDirectory}/drive_c/d3dx10/${cabFile}`)
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
            .checksum("f8f1217f666bf2f6863631a7d5e5fb3a8d1542df")
            .name("directx_Jun2010_redist.exe")
            .get();

        const progressBar = wizard.progressBar(tr("Please wait..."));
        progressBar.setText(tr("Extracting {0}...", "DirectX 10"));
        progressBar.setProgressPercentage(0);

        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(`${prefixDirectory}/drive_c/d3dx10/`)
            .extract(["-L", "-F", "*d3dx10*x86*"]);

        const filesToExtractx86 = [
            "apr2007_d3dx10_33_x86.cab",
            "aug2007_d3dx10_35_x86.cab",
            "aug2008_d3dx10_39_x86.cab",
            "aug2009_d3dx10_42_x86.cab",
            "dec2006_d3dx10_00_x86.cab",
            "jun2007_d3dx10_34_x86.cab",
            "jun2008_d3dx10_38_x86.cab",
            "jun2010_d3dx10_43_x86.cab",
            "mar2008_d3dx10_37_x86.cab",
            "mar2009_d3dx10_41_x86.cab",
            "nov2007_d3dx10_36_x86.cab",
            "nov2008_d3dx10_40_x86.cab"
        ];

        this.extractDirectXToSystemDirectory(progressBar, filesToExtractx86, system32directory, "d3dx10*.dll");

        if (architecture == "amd64") {
            const system64directory = this.wine.system64directory();

            new CabExtract()
                .wizard(wizard)
                .archive(setupFile)
                .to(`${prefixDirectory}/drive_c/d3dx10/`)
                .extract(["-L", "-F", "*d3dx10*x64*"]);

            const filesToExtractx64 = [
                "apr2007_d3dx10_33_x64.cab",
                "aug2007_d3dx10_35_x64.cab",
                "aug2008_d3dx10_39_x64.cab",
                "aug2009_d3dx10_42_x64.cab",
                "dec2006_d3dx10_00_x64.cab",
                "jun2007_d3dx10_34_x64.cab",
                "jun2008_d3dx10_38_x64.cab",
                "jun2010_d3dx10_43_x64.cab",
                "mar2008_d3dx10_37_x64.cab",
                "mar2009_d3dx10_41_x64.cab",
                "nov2007_d3dx10_36_x64.cab",
                "nov2008_d3dx10_40_x64.cab"
            ];

            this.extractDirectXToSystemDirectory(progressBar, filesToExtractx64, system64directory, "d3dx10*.dll");
        }

        this.wine
            .overrideDLL()
            .set("native", [
                "d3dx10_33",
                "d3dx10_34",
                "d3dx10_35",
                "d3dx10_36",
                "d3dx10_37",
                "d3dx10_38",
                "d3dx10_39",
                "d3dx10_40",
                "d3dx10_41",
                "d3dx10_42",
                "d3dx10_43"
            ])
            .do();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "d3dx10", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new D3DX10(wine).go();

        wizard.close();
    }
}

module.default = D3DX10;
