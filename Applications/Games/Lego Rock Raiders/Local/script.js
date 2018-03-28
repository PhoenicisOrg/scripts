include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

new LocalInstallerScript()
    .name("Lego Rock Raiders")
    .editor("LEGO Media")
    .author("Zemogiter")
    .category("Games")
    .executable("LegoRR.exe")
    .postInstall(function(wine,wizard) {
        var GameDir = wine.prefixDirectory + "drive_c/" + wine.programFiles() + "/LEGO Media/Games/Rock Raiders/d3drm.dll";
        new Downloader()
            .wizard(wizard)
            .url("http://s2.pliki.info/5709/d3drm.dll")
            .checksum("af25767f425fa7877b996e5d29a54cab29b5ecfb")
            .to(GameDir)
            .get();
    })
    .go();
