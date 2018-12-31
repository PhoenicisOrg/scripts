include(["engines", "wine", "quick_script", "quick_script"]);
include(["utils", "functions", "net", "download"]);
include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "verbs", "gdiplus"]);

function GogScript() {
    QuickScript.call(this);
}

GogScript.prototype = Object.create(QuickScript.prototype);

GogScript.prototype.constructor = GogScript;

GogScript.prototype.gogSetupFileName = function (setupFileName) {
    this._setupFileName = setupFileName;
    return this;
}

/**
 * Presents a Gog.com login window to the user, login to its account and return a token that can be used later.
 * Stores the tocken in a parameter
 * @param {SetupWizard} setupWizard The setupWizard to use
 * @returns {GogScript} This
 */
GogScript.prototype.loginToGog = function (setupWizard) {
    var browserWindow = setupWizard.createBrowser("Please login to your GoG.com account so that we can download the game for you:");
    browserWindow.goToUrl("https://auth.gog.com/auth?client_id=46899977096215655&redirect_uri=https%3A%2F%2Fembed.gog.com%2Fon_login_success%3Forigin%3Dclient&response_type=code&layout=client2");
    browserWindow.waitForUrl("https://embed.gog.com/*");
    var currentUrl = browserWindow.getCurrentUrl();
    var code = currentUrl.split("code=")[1].split("&")[0];

    var tokenUrl = "https://auth.gog.com/token?client_id=46899977096215655&client_secret=9d85c43b1482497dbbce61f6e4aa173a433796eeae2ca8c5f6129f2dc4de46d9&grant_type=authorization_code&code="+code+"&redirect_uri=https%3A%2F%2Fembed.gog.com%2Fon_login_success%3Forigin%3Dclient";
    this._token = new Downloader().url(tokenUrl).json();
    return this;
}

GogScript.prototype.download = function (setupWizard) {
    this._setupFile = createTempFile("exe");

    new Downloader()
        .url("https://www.gog.com/downloads/" + this._setupFileName)
        .wizard(setupWizard)
        .to(this._setupFile)
        .headers({"Authorization": "Bearer " + this._token["access_token"]})
        .get()
}

GogScript.prototype.go = function () {
    var setupWizard = SetupWizard(InstallationType.APPS, this._name, this.miniature());

    setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

    this.loginToGog(setupWizard);
    this.download(setupWizard);

    var wine = new Wine()
        .wizard(setupWizard)
        .prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion)
        .create()
        .wait();

    this._preInstall(wine, setupWizard);

    wine.gdiplus();
    wine.run(this._setupFile, [], wine.prefixDirectory() + "/drive_c/", true, true);

    this._postInstall(wine, setupWizard);

    this._createShortcut(wine.prefix());

    setupWizard.close();
}