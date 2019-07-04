include("engines.wine.quick_script.quick_script");
include("utils.functions.net.download");
include("engines.wine.engine.object");
include("utils.functions.filesystem.extract");
include("engines.wine.verbs.luna");

class ZipScript extends QuickScript {
    constructor() {
        super();
    }

    url(url) {
        this._url = url;
        return this;
    }

    checksum(checksum) {
        this._checksum = checksum;
        return this;
    }

    go() {
        const setupWizard = SetupWizard(InstallationType.APPS, this._name, this.miniature());

        setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

        const wine = new Wine()
            .wizard(setupWizard)
            .prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion)
            .create()
            .luna()
            .wait();

        this._preInstall(wine, setupWizard);

        // back to generic wait (might have been changed in preInstall)
        setupWizard.wait(tr("Please wait..."));

        let archive = "";
        if (!this._url) {
            archive = setupWizard.browse(tr("Please select the .zip file."), wine.prefixDirectory(), ["zip"]);
        } else {
            archive = wine.prefixDirectory() + "/drive_c/archive.zip";
            new Downloader()
                .wizard(setupWizard)
                .url(this._url)
                .checksum(this._checksum)
                .to(archive)
                .get();
        }

        new Extractor()
            .wizard(setupWizard)
            .archive(archive)
            .to(wine.prefixDirectory() + "/drive_c/" + this._name)
            .extract();

        this._postInstall(wine, setupWizard);

        this._createShortcut(wine.prefix());

        // back to generic wait (might have been changed in postInstall)
        setupWizard.wait(tr("Please wait..."));

        setupWizard.close();
    }
}
