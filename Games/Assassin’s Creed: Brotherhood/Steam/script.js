include(["Functions", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Assassin’s Creed® Brotherhood")
    .editor("Ubisoft")
    .author("Plata")
    .appId(48190)
    .wineVersion("2.5")
    .wineDistribution("staging")
    .postInstall(function(wine, wizard) {
        var tempFile = createTempFile("exe");

        new Downloader()
            .wizard(wizard)
            .url("https://ubistatic3-a.akamaihd.net/orbit/launcher_installer/UplayInstaller.exe")
            .to(tempFile)
            .get();

        wine.run(tempFile)
            .wait("Please follow the steps of the Uplay setup.\n\nUncheck \"Run Uplay\" or close Uplay completely after the setup so that the installation of \"" + this._name + "\" can continue.");

        wine.setOsForApplication().set("upc.exe", "winxp").do();
    })
    .go();
