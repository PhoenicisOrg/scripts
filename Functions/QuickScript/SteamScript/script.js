include(["Functions", "QuickScript", "QuickScript"]);
include(["Functions", "Net", "Download"]);
include(["Functions", "Engines", "Wine"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Filesystem", "Files"]);
include(["Functions", "Shortcuts", "Wine"]);
include(["Functions", "Verbs", "luna"]);


function SteamScript() {
    QuickScript.call(this);

    this._executable = "Steam.exe";
    this._category = "Games"
}

SteamScript.prototype = Object.create(QuickScript.prototype);

SteamScript.prototype.constructor = SteamScript;

SteamScript.prototype.appId = function(appId) {
    this._appId = appId;
    this._applicationHomepage = "http://store.steampowered.com/app/" + appId;
    this._executableArgs = ["-silent", "-applaunch", this._appId];
    return this;
};

SteamScript.prototype.getBytesToDownload = function(wine) {
    // wait until download started
    while (!fileExists(wine.prefixDirectory + "/drive_c/" + wine.getProgramFiles() + "/Steam/steamapps/appmanifest_" + this._appId + ".acf"))
    {
        java.lang.Thread.sleep(100);
    }

    // make sure that BytesToDownload is set
    var bytesToDownload = 0;
    while (bytesToDownload == 0)
    {
        var manifest = cat(wine.prefixDirectory + "/drive_c/" + wine.getProgramFiles() + "/Steam/steamapps/appmanifest_" + this._appId + ".acf");
        bytesToDownload = Number(manifest.match(/\"BytesToDownload\"\s+\"(\d+)\"/)[1]);
        java.lang.Thread.sleep(100);
    }
    return bytesToDownload;
};

SteamScript.prototype.getBytesDownloaded = function(wine) {
    var downloadFolder = wine.prefixDirectory + "/drive_c/" + wine.getProgramFiles() + "/Steam/steamapps/downloading/" + this._appId;
    // download folder is not yet/no more available
    if (!fileExists(downloadFolder))
    {
        // check if download already finished (download folder has been deleted)
        if (fileExists(wine.prefixDirectory + "/drive_c/" + wine.getProgramFiles() + "/Steam/steamapps/appmanifest_" + this._appId + ".acf"))
        {
            var manifest = cat(wine.prefixDirectory + "/drive_c/" + wine.getProgramFiles() + "/Steam/steamapps/appmanifest_" + this._appId + ".acf");
            return Number(manifest.match(/\"BytesDownloaded\"\s+\"(\d+)\"/)[1]);
        }
        else
        {
            return 0;
        }
    }

    return getFileSize(downloadFolder);
};

SteamScript.prototype.go = function() {
    var setupWizard = SetupWizard(this._name);

    setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

    var tempFile = createTempFile("exe");

    new Downloader()
        .wizard(setupWizard)
        .url("http://media.steampowered.com/client/installer/SteamSetup.exe")
        .checksum("e930dbdb3bc638f772a8fcd92dbcd0919c924318")
        .to(tempFile)
        .get();

    var wine = new Wine()
        .wizard(setupWizard)
        .architecture(this._wineArchitecture)
        .version(this._wineVersion)
        .prefix(this._name)
        .luna()
        .run(tempFile)
        .wait();

    this._preInstall(wine, setupWizard);

    new WineShortcut()
        .name(this._name)
        .prefix(this._name)
        .search(this._executable)
        .arguments(this._executableArgs)
        .miniature([this._category, this._name])
        .create();

    wine.runInsidePrefix(wine.getProgramFiles() + "/Steam/Steam.exe", ["-silent", "-applaunch", this._appId]);
    var bytesToDownload = this.getBytesToDownload(wine);
    var bytesDownloaded = 0;
    var progressBar = setupWizard.progressBar("Please wait until Steam has finished the download...");
    while (bytesDownloaded < bytesToDownload)
    {
        bytesDownloaded = this.getBytesDownloaded(wine);
        progressBar.setProgressPercentage((bytesDownloaded / bytesToDownload) * 100);
        progressBar.setText("Downloaded " + bytesDownloaded + " of " + bytesToDownload + " bytes");
        java.lang.Thread.sleep(100);
    }

    // make sure download is really finished (download folder file size is not exact)
    setupWizard.wait("Please wait...");
    do {
        bytesToDownload = this.getBytesToDownload(wine);
        bytesDownloaded = this.getBytesDownloaded(wine);
        java.lang.Thread.sleep(100);
    } while (bytesDownloaded != bytesToDownload);

    // close Steam
    wine.runInsidePrefix(wine.getProgramFiles() + "/Steam/Steam.exe", "-shutdown");

    this._postInstall(wine, setupWizard);

    setupWizard.close();
};
