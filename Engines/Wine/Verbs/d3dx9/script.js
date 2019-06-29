include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");

/**
 * Verb to install D3DX9
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.d3dx9 = function () {
    var that = this;

    var extractDirectXtoSystemDirectory = function (progressBar, filesToExtract, destination, pattern) {
        var numberOfExtractedFiles = 0;
        filesToExtract.forEach(function (cabFile) {
            print(tr("Extracting {0}...", cabFile));
            progressBar.setText(tr("Extracting {0}...", "DirectX 9"));
            progressBar.setProgressPercentage(numberOfExtractedFiles * 100 / filesToExtract.length);

            new CabExtract()
                .archive(that.prefixDirectory() + "/drive_c/d3dx9/" + cabFile)
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
    progressBar.setText(tr("Extracting {0}...", "DirectX 9"));
    progressBar.setProgressPercentage(0.);

    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory() + "/drive_c/d3dx9/")
        .extract(["-L", "-F", "*d3dx9*x86*"]);

    var filesToExtractx86 = [
        "apr2007_d3dx9_33_x86.cab", "aug2007_d3dx9_35_x86.cab", "apr2005_d3dx9_25_x86.cab",
        "apr2006_d3dx9_30_x86.cab", "aug2005_d3dx9_27_x86.cab", "aug2008_d3dx9_39_x86.cab",
        "aug2009_d3dx9_42_x86.cab", "dec2006_d3dx9_32_x86.cab", "dec2005_d3dx9_28_x86.cab",
        "feb2005_d3dx9_24_x86.cab", "feb2006_d3dx9_29_x86.cab", "jun2007_d3dx9_34_x86.cab",
        "jun2008_d3dx9_38_x86.cab", "jun2005_d3dx9_26_x86.cab", "jun2010_d3dx9_43_x86.cab",
        "mar2008_d3dx9_37_x86.cab", "mar2009_d3dx9_41_x86.cab", "nov2007_d3dx9_36_x86.cab",
        "nov2008_d3dx9_40_x86.cab", "oct2006_d3dx9_31_x86.cab"
    ];
    extractDirectXtoSystemDirectory(progressBar, filesToExtractx86, that.system32directory(), "d3dx9*.dll");

    if (this.architecture() == "amd64") {
        new CabExtract()
            .archive(setupFile)
            .to(this.prefixDirectory() + "/drive_c/d3dx9/")
            .extract(["-L", "-F", "*d3dx9*x64*"]);

        var filesToExtractx64 = [
            "APR2007_d3dx9_33_x64.cab", "AUG2007_d3dx9_35_x64.cab", "Apr2005_d3dx9_25_x64.cab",
            "Apr2006_d3dx9_30_x64.cab", "Aug2005_d3dx9_27_x64.cab", "Aug2008_d3dx9_39_x64.cab",
            "Aug2009_d3dx9_42_x64.cab", "DEC2006_d3dx9_32_x64.cab", "Dec2005_d3dx9_28_x64.cab",
            "Feb2005_d3dx9_24_x64.cab", "Feb2006_d3dx9_29_x64.cab", "JUN2007_d3dx9_34_x64.cab",
            "JUN2008_d3dx9_38_x64.cab", "Jun2005_d3dx9_26_x64.cab", "Jun2010_d3dx9_43_x64.cab",
            "Mar2008_d3dx9_37_x64.cab", "Mar2009_d3dx9_41_x64.cab", "Nov2007_d3dx9_36_x64.cab",
            "Nov2008_d3dx9_40_x64.cab", "OCT2006_d3dx9_31_x64.cab"
        ];

        extractDirectXtoSystemDirectory(progressBar, filesToExtractx64, that.system64directory(), "d3dx9*.dll");
    }

    this.overrideDLL()
        .set("native", [
            "d3dx9_24", "d3dx9_25", "d3dx9_26", "d3dx9_27", "d3dx9_28", "d3dx9_29", "d3dx9_30",
            "d3dx9_31", "d3dx9_32", "d3dx9_33", "d3dx9_34", "d3dx9_35", "d3dx9_36", "d3dx9_37",
            "d3dx9_38", "d3dx9_39", "d3dx9_40", "d3dx9_41", "d3dx9_42", "d3dx9_43"
        ])
        .do();
    return this;
};

/**
 * Verb to install D3DX9
 */
// eslint-disable-next-line no-unused-vars
class D3DX9Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "d3dx9", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.d3dx9();
        wizard.close();
    }
}
