include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .name("Origin")
    .editor("Electronic Arts")
    .applicationHomepage("https://www.origin.com/deu/en-us/store")
    .author("Plata")
    .url("https://origin-a.akamaihd.net/Origin-Client-Download/origin/legacy/OriginThinSetup.exe")
    .category("Games")
    .executable("Origin.exe")
    .wineVersion("2.10")
    .preInstall(function(wine, wizard) {
        wizard.message(tr("When Origin launches, you will get an error message (\"Your update could not be completed.\"). This is ok. Just close the popup."));
    })
    .postInstall(function(wine, wizard) {
        var originDir = wine.prefixDirectory + "drive_c/" + wine.programFiles() + "/Origin/";

        new Downloader()
            .wizard(wizard)
            .url("https://origin-a.akamaihd.net/Origin-Client-Download/origin/live/OriginUpdate_9_12_0_34172.zip")
            .checksum("c4a2a742f966efa0114bf8025699007ebbda4d8f")
            .to(originDir + "OriginUpdate_9_12_0_34172.zip")
            .get();

        new Extractor()
            .wizard(wizard)
            .archive(originDir + "OriginUpdate_9_12_0_34172.zip")
            .to(originDir)
            .extract();
    })
    .go();
