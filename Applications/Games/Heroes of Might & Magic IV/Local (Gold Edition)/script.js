const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const Resource = include("utils.functions.net.resource");
const {LATEST_DEVELOPMENT_VERSION} = include("engines.wine.engine.versions");
const Downloader = include("utils.functions.net.download");

new LocalInstallerScript()
    .name("Heroes of Might & Magic IV")
    .editor("New World Computing, Inc.")
    .applicationHomepage("http://www.spacecolonyhd.com/")
    .author("Zemogiter")
    .category("Games")
    .wineDistribution("upstream")
    .wineVersion(LATEST_DEVELOPMENT_VERSION)
    .executable("Heroes4_sfx.exe")
    .postInstall(function (wine) {
        var patch = new Resource()
            .wizard(this._wizard)
            .url("https://equilibris.celestialheavens.com/downloads/install_equilibris_v.3.51.exe")
            .checksum("3a188a45017a1fd7cb38d6883428f6abc9b6e160")
            .name("install_equilibris_v.3.51.exe")
            .get();
        wine.run(patch);
        var dataDirectory = wine.prefixDirectory() + "drive_c/" + wine.programFiles() + "Ubisoft/Heroes of Might & Magic IV - Złota Edycja/Data";
        new Downloader()
            .wizard(this._wizard)
            .url("https://equilibris.celestialheavens.com/downloads/equi.aop")
            .checksum("3a188a45017a1fd7cb38d6883428f6abc9b6e160")
            .to(dataDirectory)
            .get();
    });
