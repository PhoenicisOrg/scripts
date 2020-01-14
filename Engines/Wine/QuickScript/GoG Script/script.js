const Wine = include("engines.wine.engine.object");
const QuickScript = include("engines.wine.quick_script.quick_script");
const Downloader = include("utils.functions.net.download");
const { createTempDir } = include("utils.functions.filesystem.files");

const Luna = include("engines.wine.verbs.luna");
const GDIPlus = include("engines.wine.verbs.gdiplus");

module.default = class GogScript extends QuickScript {
    constructor() {
        super();
    }

    /**
     * Sets one setup file name so that the script can fetch it from gog.com
     *
     * @param {string} setupFileName The setup file name
     * @returns {GogScript} This
     */
    gogSetupFileName(setupFileName) {
        this._setupFileNames = [setupFileName];
        return this;
    }

    /**
     * Sets the setup file(s) name so that the script can fetch it from gog.com
     *
     * @param {string[]} setupFileNames The setup file name(s)
     * @returns {GogScript} This
     */
    gogSetupFileNames(setupFileNames) {
        this._setupFileNames = setupFileNames;
        return this;
    }

    /**
     * Presents a Gog.com login window to the user, login to its account and return a token that can be used later.
     * Stores the tocken in a parameter
     *
     * @param {SetupWizard} setupWizard The setupWizard to use
     * @returns {GogScript} This
     */
    loginToGog(setupWizard) {
        const browserWindow = setupWizard.createBrowser(
            tr("Please login to your GoG.com account so that we can download the game for you:")
        );
        browserWindow.goToUrl(
            "https://auth.gog.com/auth?" +
                "client_id=46899977096215655&" +
                "redirect_uri=https%3A%2F%2Fembed.gog.com%2Fon_login_success%3Forigin%3Dclient&" +
                "response_type=code&" +
                "layout=client2"
        );
        browserWindow.waitForUrl("https://embed.gog.com/*");

        const currentUrl = browserWindow.getCurrentUrl();
        const code = currentUrl.split("code=")[1].split("&")[0];

        const tokenUrl =
            "https://auth.gog.com/token?" +
            "client_id=46899977096215655&" +
            "client_secret=9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9&" +
            "grant_type=authorization_code&" +
            `code=${code}&` +
            "redirect_uri=https%3A%2F%2Fembed.gog.com%2Fon_login_success%3Forigin%3Dclient";
        this._token = new Downloader().url(tokenUrl).json();

        return this;
    }

    _downloadSetupFile(setupWizard, setupFileName, tmpDirectory) {
        const url = `https://www.gog.com/downloads/${setupFileName}`;

        // We set a user agent so that GoG sends the filename of the executable
        return new Downloader()
            .url(url)
            .wizard(setupWizard)
            .to(tmpDirectory)
            .headers({
                Authorization: "Bearer " + this._token["access_token"],
                "User-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:64.0) Gecko/20100101 Firefox/64.0"
            })
            .get();
    }

    /**
     * Download the setup resources in the same directory, and returns the path of the .exe
     *
     * @param {SetupWizard} setupWizard The setup wizard
     * @returns {String} The .exe file entry that can be used to continue the installation
     */
    download(setupWizard) {
        const setupDirectory = createTempDir();

        return this._setupFileNames
            .map(setupFileName => this._downloadSetupFile(setupWizard, setupFileName, setupDirectory))
            .find(downloadedFile => downloadedFile.endsWith(".exe"));
    }

    go() {
        const setupWizard = SetupWizard(InstallationType.APPS, this._name, this.miniature());

        setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

        this._determineWineVersion(setupWizard);

        this.loginToGog(setupWizard);
        const setupFile = this.download(setupWizard);

        const wine = new Wine()
            .wizard(setupWizard)
            .prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion)
            .create()
            .wait();
        
        new Luna(wine).go();

        this._preInstall(wine, setupWizard);

        new GDIPlus(wine).go();

        wine.run(setupFile, [], wine.prefixDirectory() + "/drive_c/", true, true);

        this._postInstall(wine, setupWizard);

        this._createShortcut(wine.prefix());

        setupWizard.close();
    }
};
