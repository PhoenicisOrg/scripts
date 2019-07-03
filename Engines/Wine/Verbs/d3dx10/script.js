include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");

/**
 * Verb to install D3DX10
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.d3dx10 = function () {
    var that = this;

    var extractDirectXtoSystemDirectory = function (progressBar, filesToExtract, destination, pattern) {
        var numberOfExtractedFiles = 0;
        filesToExtract.forEach(function (cabFile) {
            print(tr("Extracting {0}...", cabFile));
            progressBar.setText(tr("Extracting {0}...", "DirectX 10"));
            progressBar.setProgressPercentage(numberOfExtractedFiles * 100 / filesToExtract.length);

            new CabExtract()
                .archive(that.prefixDirectory() + "/drive_c/d3dx10/" + cabFile)
                .to(destination)
                .extract(["-L", "-F", pattern]);

            numberOfExtractedFiles++;
        });
    };

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("http://download.microsoft.com/download/8/4/A/84A35BF1-DAFE-4AE8-82AF-AD2AE20B6B14/directx_Jun2010_redist.exe")
        .checksum("f8f1217f666bf2f6863631a7d5e5fb3a8d1542df")
        .name("directx_Jun2010_redist.exe")
        .get();

    var progressBar = this.wizard().progressBar(tr("Please wait..."));
    progressBar.setText(tr("Extracting {0}...", "DirectX 10"));
    progressBar.setProgressPercentage(0.);

    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory() + "/drive_c/d3dx10/")
        .extract(["-L", "-F", "*d3dx10*x86*"]);

    var filesToExtractx86 = [
        "apr2007_d3dx10_33_x86.cab", "aug2007_d3dx10_35_x86.cab", "aug2008_d3dx10_39_x86.cab",
        "aug2009_d3dx10_42_x86.cab", "dec2006_d3dx10_00_x86.cab", "jun2007_d3dx10_34_x86.cab",
        "jun2008_d3dx10_38_x86.cab", "jun2010_d3dx10_43_x86.cab", "mar2008_d3dx10_37_x86.cab",
        "mar2009_d3dx10_41_x86.cab", "nov2007_d3dx10_36_x86.cab", "nov2008_d3dx10_40_x86.cab"
    ];
    extractDirectXtoSystemDirectory(progressBar, filesToExtractx86, that.system32directory(), "d3dx10*.dll");

    if (this.architecture() == "amd64") {
        new CabExtract()
            .archive(setupFile)
            .to(this.prefixDirectory() + "/drive_c/d3dx10/")
            .extract(["-L", "-F", "*d3dx10*x64*"]);

        var filesToExtractx64 = [
            "apr2007_d3dx10_33_x64.cab", "aug2007_d3dx10_35_x64.cab", "aug2008_d3dx10_39_x64.cab",
            "aug2009_d3dx10_42_x64.cab", "dec2006_d3dx10_00_x64.cab", "jun2007_d3dx10_34_x64.cab",
            "jun2008_d3dx10_38_x64.cab", "jun2010_d3dx10_43_x64.cab", "mar2008_d3dx10_37_x64.cab",
            "mar2009_d3dx10_41_x64.cab", "nov2007_d3dx10_36_x64.cab", "nov2008_d3dx10_40_x64.cab"
        ];

        extractDirectXtoSystemDirectory(progressBar, filesToExtractx64, that.system64directory(), "d3dx10*.dll");
    }

    this.overrideDLL()
        .set("native", [
            "d3dx10_33", "d3dx10_34", "d3dx10_35", "d3dx10_36", "d3dx10_37", "d3dx10_38",
            "d3dx10_39", "d3dx10_40", "d3dx10_41", "d3dx10_42", "d3dx10_43"
        ])
        .do();
    return this;
};

/**
 * Verb to install D3DX10
 */
// eslint-disable-next-line no-unused-vars
class D3DX10Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "d3dx10", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.d3dx10();
        wizard.close();
    }
}
