const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const Resource = include("utils.functions.net.resource");
const { getLatestDevelopmentVersion } = include("engines.wine.engine.versions");
const Downloader = include("utils.functions.net.download");

new LocalInstallerScript()
    .name("Heroes of Might & Magic IV")
    .editor("New World Computing, Inc.")
    .author("Zemogiter")
    .category("Games")
    .wineDistribution("upstream")
    .wineVersion(getLatestDevelopmentVersion)
    .executable("H4mod.exe")
    .postInstall((wine) => {
        const dataDirectory = wine.prefixDirectory() + "drive_c/" + wine.programFiles() + "Ubisoft/Heroes of Might & Magic IV - Złota Edycja/Data";

        const patchForGameExecutable = new Resource()
            .wizard(wine.wizard())
            .url("https://equilibris.celestialheavens.com/downloads/heroes4_sfx.exe")
            .checksum("373df5403ada0d2bb9285862efeca00415cb0915")
            .name("heroes4_sfx.exe")
            .get();
        wine.run(patchForGameExecutable, null, false, true);
        wine.wait();

        const patchForCampaignEditor = new Resource()
            .wizard(wine.wizard())
            .url("https://equilibris.celestialheavens.com/downloads/camp_ed_sfx.exe")
            .checksum("9d34c409a0358057b0c2d00b7d4c96ccd67c7214")
            .name("camp_ed_sfx.exe")
            .get();
        wine.run(patchForCampaignEditor, null, false, true);
        wine.wait();

        new Downloader()
            .wizard(wine.wizard())
            .url("https://equilibris.celestialheavens.com/downloads/equi.aop")
            .checksum("3a188a45017a1fd7cb38d6883428f6abc9b6e160")
            .to(dataDirectory)
            .get();

        const mod = new Resource()
            .wizard(wine.wizard())
            .url("https://equilibris.celestialheavens.com/downloads/install_equilibris_v.3.51.exe")
            .checksum("3a188a45017a1fd7cb38d6883428f6abc9b6e160")
            .name("install_equilibris_v.3.51.exe")
            .get();
        wine.run(mod, null, false, true);
        wine.wait();
    });
