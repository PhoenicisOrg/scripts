include(["Engines", "Wine", "QuickScript", "LocalInstallerScript"]);
include(["Utils", "Functions", "Filesystem", "Files"]);
//include(["Utils", "Functions", "Apps", "Resources"]);
//include(["Engines", "Wine", "Engine", "Object"]);

new LocalInstallerScript()
    .name("Lego Rock Raiders")
    .editor("LEGO Media")
    .author("Zemogiter")
    .category("Games")
    .executable("LegoRR.exe")
    /*.preInstall(function(wine,wizard) {
        wine.windowsVersion("nt40");
        var SetupFile = new Downloader()
            .wizard(wizard)
            .url("http://s3.amazonaws.com/moviecodec/files/iv5setup.exe")
            .checksum("c5550ae11b1500e26c45dbbe87debfbbe4aa491a")
            .to(wine.prefixDirectory + "drive_c/iv5setup.exe")
            .get();
        wine.run(wine.prefixDirectory + "drive_c/iv5setup.exe")
        .wait(tr("Please wait while {0} is installed ...", "Indeo Codecs 5"));
        var registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("fix.reg");
        wine.regedit().patch(registrySettings);
    })*/
    .postInstall(function(wine,wizard) {
        var GameDir = wine.prefixDirectory + "drive_c/" + wine.programFiles() + "/LEGO Media/Games/Rock Raiders/d3drm.dll";
        var DllFile = new Downloader()
            .wizard(wizard)
            .url("http://s2.pliki.info/5709/d3drm.dll")
            .checksum("af25767f425fa7877b996e5d29a54cab29b5ecfb")
            .to(GameDir)
            .get();
    })
    .go();
