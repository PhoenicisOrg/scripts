const QuickScript = include("engines.wine.quick_script.quick_script");
const Downloader = include("utils.functions.net.download");
const Wine = include("engines.wine.engine.object");
const {cat, fileExists, writeToFile, createTempFile} = include("utils.functions.filesystem.files");

const Luna = include("engines.wine.verbs.luna");
const Corefonts = include("engines.wine.verbs.corefonts");
include("engines.wine.plugins.override_dll");
include("engines.wine.plugins.windows_version");

module.default = class SteamScript extends QuickScript {
    constructor() {
        super();

        this._executable = "Steam.exe";
        this._category = "Games";
        this._gameOverlay = true;
    }

    appId(appId) {
        this._appId = appId;
        return this;
    }

    gameOverlay(gameOverlay) {
        // get
        if (arguments.length == 0) {
            return this._gameOverlay;
        }

        // set
        this._gameOverlay = gameOverlay;
        return this;
    }

    manifest(wine) {
        if (!this._manifest) {
            // cache manifest path (will not change during the installation)
            this._manifest = wine.prefixDirectory() + "/drive_c/" + wine.programFiles() + "/Steam/steamapps/appmanifest_" + this._appId + ".acf";
        }
        return this._manifest;
    }

    downloadStarted(wine) {
        if (fileExists(this.manifest(wine))) {
            const manifest = cat(this.manifest(wine));
            const state = Number(manifest.match(/\"StateFlags\"\s+\"(\d+)\"/)[1]);
            return state == 1026 || state == 1042 || state == 1062 || state == 1030;
        }
        else {
            return false;
        }
    }

    downloadFinished(wine) {
        // check if download already finished (download folder has been deleted)
        if (fileExists(this.manifest(wine))) {
            const manifest = cat(this.manifest(wine));
            const state = Number(manifest.match(/\"StateFlags\"\s+\"(\d+)\"/)[1]);
            return state != 1026 && state != 1042 && state != 1062 && state != 1030;
        }
        else {
            return false;
        }
    }

    configVdf(wine) {
        if (!this._configVdf) {
            // cache config.vdf path (will not change during the installation)
            this._configVdf = wine.prefixDirectory() + "/drive_c/" + wine.programFiles() + "/Steam/config/config.vdf";
        }
        return this._configVdf;
    }

    // Fix for the "content server unavailable" error (Wine bug 45329)
    fixCertificateIssue(wine) {
        const steamConfigFile = this.configVdf(wine);
        const steamConfig = cat(steamConfigFile);
        const cmPos = steamConfig.indexOf("\"CM\"");
        const csConfig = "\"CS\" \"valve511.steamcontent.com;valve501.steamcontent.com;valve517.steamcontent.com;valve557.steamcontent.com;valve513.steamcontent.com;valve535.steamcontent.com;valve546.steamcontent.com;valve538.steamcontent.com;valve536.steamcontent.com;valve530.steamcontent.com;valve559.steamcontent.com;valve545.steamcontent.com;valve518.steamcontent.com;valve548.steamcontent.com;valve555.steamcontent.com;valve556.steamcontent.com;valve506.steamcontent.com;valve544.steamcontent.com;valve525.steamcontent.com;valve567.steamcontent.com;valve521.steamcontent.com;valve510.steamcontent.com;valve542.steamcontent.com;valve519.steamcontent.com;valve526.steamcontent.com;valve504.steamcontent.com;valve500.steamcontent.com;valve554.steamcontent.com;valve562.steamcontent.com;valve524.steamcontent.com;valve502.steamcontent.com;valve505.steamcontent.com;valve547.steamcontent.com;valve560.steamcontent.com;valve503.steamcontent.com;valve507.steamcontent.com;valve553.steamcontent.com;valve520.steamcontent.com;valve550.steamcontent.com;valve531.steamcontent.com;valve558.steamcontent.com;valve552.steamcontent.com;valve563.steamcontent.com;valve540.steamcontent.com;valve541.steamcontent.com;valve537.steamcontent.com;valve528.steamcontent.com;valve523.steamcontent.com;valve512.steamcontent.com;valve532.steamcontent.com;valve561.steamcontent.com;valve549.steamcontent.com;valve522.steamcontent.com;valve514.steamcontent.com;valve551.steamcontent.com;valve564.steamcontent.com;valve543.steamcontent.com;valve565.steamcontent.com;valve529.steamcontent.com;valve539.steamcontent.com;valve566.steamcontent.com;valve165.steamcontent.com;valve959.steamcontent.com;valve164.steamcontent.com;valve1611.steamcontent.com;valve1601.steamcontent.com;valve1617.steamcontent.com;valve1603.steamcontent.com;valve1602.steamcontent.com;valve1610.steamcontent.com;valve1615.steamcontent.com;valve909.steamcontent.com;valve900.steamcontent.com;valve905.steamcontent.com;valve954.steamcontent.com;valve955.steamcontent.com;valve1612.steamcontent.com;valve1607.steamcontent.com;valve1608.steamcontent.com;valve1618.steamcontent.com;valve1619.steamcontent.com;valve1606.steamcontent.com;valve1605.steamcontent.com;valve1609.steamcontent.com;valve907.steamcontent.com;valve901.steamcontent.com;valve902.steamcontent.com;valve1604.steamcontent.com;valve908.steamcontent.com;valve950.steamcontent.com;valve957.steamcontent.com;valve903.steamcontent.com;valve1614.steamcontent.com;valve904.steamcontent.com;valve952.steamcontent.com;valve1616.steamcontent.com;valve1613.steamcontent.com;valve958.steamcontent.com;valve956.steamcontent.com;valve906.steamcontent.com\"\n";
        const newSteamConfig = steamConfig.slice(0, cmPos) + csConfig + steamConfig.slice(cmPos);
        writeToFile(steamConfigFile, newSteamConfig)
    }

    go() {
        // default application homepage if not specified
        if (!this._applicationHomepage) {
            this._applicationHomepage = "https://store.steampowered.com/app/" + this._appId;
        }

        // default executable args if not specified
        if (!this._executableArgs) {
            this._executableArgs = ["-no-cef-sandbox", "-silent", "-applaunch", this._appId];
        }

        const setupWizard = SetupWizard(InstallationType.APPS, this._name, this.miniature());

        setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

        const tempFile = createTempFile("exe");

        new Downloader()
            .wizard(setupWizard)
            .url("https://steamcdn-a.akamaihd.net/client/installer/SteamSetup.exe")
            .checksum("4b1b85ec2499a4ce07c89609b256923a4fc479e5")
            .to(tempFile)
            .get();

        const wine = new Wine()
            .wizard(setupWizard)
            .prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion);

        new Luna(wine).go();
        new Corefonts(wine).go();

        // Steam must be started once such that config.vdf is created (see fixCertificateIssue())
        setupWizard.wait(tr("Please follow the steps of the Steam setup. Then, wait until Steam is updated, log in and finally close Steam completely so the installation of \"{0}\" can continue.", this._name));
        wine.run(tempFile, [], null, false, true);

        // Set windows environment for executable that needs it
        wine.setOsForApplication().set("steam.exe", "winxp").do();
        wine.setOsForApplication().set("steamwebhelper.exe", "winxp").do();

        // Fix for Uplay games that are executed on steam
        wine.setOsForApplication().set("upc.exe", "winvista").do();
        wine.setOsForApplication().set("UbisoftGameLauncher.exe", "winvista").do();

        // ensure that Steam is running (user might have unchecked "run Steam after installation finished")
        wine.runInsidePrefix(wine.programFiles() + "/Steam/Steam.exe", ["steam://nav/games"], false);

        // wait until config.vdf exists
        while (!fileExists(this.configVdf(wine))) {
            java.lang.Thread.sleep(1000);
        }

        // wait until Steam and Wine are closed
        wine.wait();

        this.fixCertificateIssue(wine);

        // Steam installation has finished
        setupWizard.wait(tr("Please wait..."));

        this._preInstall(wine, setupWizard);

        // back to generic wait (might have been changed in preInstall)
        setupWizard.wait(tr("Please wait..."));

        wine.runInsidePrefix(wine.programFiles() + "/Steam/Steam.exe", ["steam://install/" + this._appId], false);

        setupWizard.wait(tr("Please wait until Steam has finished the download..."));

        // wait until download started
        while (!this.downloadStarted(wine)) {
            java.lang.Thread.sleep(100);
        }

        // make sure download is finished
        while (!this.downloadFinished(wine)) {
            java.lang.Thread.sleep(1000);
        }

        // close Steam
        wine.runInsidePrefix(wine.programFiles() + "/Steam/Steam.exe", "-shutdown", true);

        // back to generic wait
        setupWizard.wait(tr("Please wait..."));

        // create shortcut after installation (if executable is specified, it does not exist earlier)
        this._createShortcut(wine.prefix());

        this._postInstall(wine, setupWizard);

        // deactivate game overlay if desired
        if (!this._gameOverlay) {
            wine.overrideDLL()
                .set("", ["gameoverlayrenderer"])
                .do();
        }

        // back to generic wait (might have been changed in postInstall)
        setupWizard.wait(tr("Please wait..."));

        setupWizard.close();
    }
}
