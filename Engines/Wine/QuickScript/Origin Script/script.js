const QuickScript = include("engines.wine.quick_script.quick_script");
const Downloader = include("utils.functions.net.download");
const Wine = include("engines.wine.engine.object");
const {getLatestStableVersion} = include("engines.wine.engine.versions");
const {createTempFile} = include("utils.functions.filesystem.files");

const Luna = include("engines.wine.verbs.luna");

module.default = class OriginScript extends QuickScript {
    constructor() {
        super();

        this._executable = "Origin.exe";
        this._category = "Games";
    }

    appId(appId) {
        this._appId = appId;
        return this;
    }

    go() {
        // default executable args if not specified
        if (!this._executableArgs) {
            this._executableArgs = ["origin://launchgame/" + this._appId];
        }

        const setupWizard = SetupWizard(InstallationType.APPS, this._name, this.miniature());

        setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

        this._wineVersion = getLatestStableVersion(setupWizard);

        const tempFile = createTempFile("exe");

        new Downloader()
            .wizard(setupWizard)
            .url("https://origin-a.akamaihd.net/Origin-Client-Download/origin/live/OriginThinSetup.exe")
            .to(tempFile)
            .get();

        const wine = new Wine()
            .wizard(setupWizard)
            .prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion);

        new Luna(wine).go();

        //Origin does not have an install command
        setupWizard.message(tr("Download \"{0}\" in Origin and shut it down once \"{0}\" is installed", this._name));
        wine.run(tempFile, [], null, false, true);

        // wait until Origin and Wine are closed
        wine.wait();

        // Origin installation has finished
        setupWizard.wait(tr("Please wait..."));

        this._preInstall(wine, setupWizard);

        // back to generic wait (might have been changed in preInstall)
        setupWizard.wait(tr("Please wait..."));

        this._postInstall(wine, setupWizard);

        // create shortcut after installation (if executable is specified, it does not exist earlier)
        this._createShortcut(wine.prefix());

        // back to generic wait (might have been changed in postInstall)
        setupWizard.wait(tr("Please wait..."));

        setupWizard.close();
    }
}
