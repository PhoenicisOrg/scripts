include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

new LocalInstallerScript()
    .name("Lego Rock Raiders")
    .editor("LEGO Media")
    .author("Zemogiter")
    .category("Games")
    .executable("LegoRR.exe")
    .preInstall(function(wine, wizard) {
    	wine.windowsVersion("nt40");
    })
    .postInstall(function(wine, wizard) {
        var GameDir = wine.prefixDirectory + "drive_c/" + wine.programFiles() + "/LEGO Media/Games/Rock Raiders/";
        new Downloader()
            .wizard(wizard)
            .url("http://s2.pliki.info/5709/d3drm.dll")
            .checksum("dde9e3b8c264957ae0a017d371293123")
            .to(GameDir)
            .get();
    })
    .go();
