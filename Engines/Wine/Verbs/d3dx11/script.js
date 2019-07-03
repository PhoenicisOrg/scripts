include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");

/**
 * Verb to install D3DX11
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.d3dx11 = function () {
    var that = this;

    var extractDirectXtoSystemDirectory = function (progressBar, filesToExtract, destination, pattern) {
        var numberOfExtractedFiles = 0;
        filesToExtract.forEach(function (cabFile) {
            print(tr("Extracting {0}...", cabFile));
            progressBar.setText(tr("Extracting {0}...", "DirectX 11"));
            progressBar.setProgressPercentage(numberOfExtractedFiles * 100 / filesToExtract.length);

            new CabExtract()
                .archive(that.prefixDirectory() + "/drive_c/d3dx11/" + cabFile)
                .to(destination)
                .extract(["-L", "-F", pattern]);

            numberOfExtractedFiles++;
        });
    };

    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("http://download.microsoft.com/download/8/4/A/84A35BF1-DAFE-4AE8-82AF-AD2AE20B6B14/directx_Jun2010_redist.exe")
        .checksum("7c1fc2021cf57fed3c25c9b03cd0c31a")
        .algorithm("MD5")
        .name("directx_Jun2010_redist.exe")
        .get();

    var progressBar = this.wizard().progressBar(tr("Please wait..."));
    progressBar.setText(tr("Extracting {0}...", "DirectX 11"));
    progressBar.setProgressPercentage(0.);

    new CabExtract()
        .archive(setupFile)
        .to(this.prefixDirectory() + "/drive_c/d3dx11/")
        .extract(["-L", "-F", "*d3dx11*x86*"]);

    var filesToExtractx86 = ["Aug2009_d3dx11_42_x86.cab", "Jun2010_d3dx11_43_x86.cab"];
    extractDirectXtoSystemDirectory(progressBar, filesToExtractx86, that.system32directory(), "*.dll");

    if (this.architecture() == "amd64") {
        new CabExtract()
            .archive(setupFile)
            .to(this.prefixDirectory() + "/drive_c/d3dx11/")
            .extract(["-L", "-F", "*d3dx11*x64*"]);

        var filesToExtractx64 = ["Aug2009_d3dx11_42_x86.cab", "Jun2010_d3dx11_43_x86.cab", "Aug2009_d3dx11_42_x64.cab", " Jun2010_d3dx11_43_x64.cab"];
        extractDirectXtoSystemDirectory(progressBar, filesToExtractx64, that.system64directory(), "*.dll");
    }

    this.overrideDLL()
        .set("native, builtin", ["d3dx11_42", "d3dx11_43"])
        .do();
    return this;
};

/**
 * Verb to install D3DX11
 */
// eslint-disable-next-line no-unused-vars
class D3DX11Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "d3dx11", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.d3dx11();
        wizard.close();
    }
}
