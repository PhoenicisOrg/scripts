const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const Downloader = include("utils.functions.net.download");
const {Extractor} = include("utils.functions.filesystem.extract");
const {LATEST_DEVELOPMENT_VERSION} = include("engines.wine.engine.versions");

new LocalInstallerScript()
    .name("Origin")
    .editor("Electronic Arts")
    .applicationHomepage("https://www.origin.com/deu/en-us/store")
    .author("Plata")
    .category("Games")
    .executable("Origin.exe")
    .wineVersion(LATEST_DEVELOPMENT_VERSION)
    .preInstall(function (wine, wizard) {
        wizard.message(
            tr(
                'When Origin launches, you will get an error message ("Your update could not be completed."). This is ok. Just close the popup.'
            )
        );
    })
    .postInstall(function (wine, wizard) {
        const originDir = wine.prefixDirectory() + "drive_c/" + wine.programFiles() + "/Origin/";

        const originUpdate= new Resource()
            .wizard(wizard)
            .url("https://origin-a.akamaihd.net/Origin-Client-Download/origin/live/OriginUpdate_9_12_0_34172.zip")
            .checksum("c4a2a742f966efa0114bf8025699007ebbda4d8f")
            .name("OriginUpdate_9_12_0_34172.zip")
            .get();

        new Extractor()
            .wizard(wizard)
            .archive(originUpdate)
            .to(originDir)
            .extract();
    });
