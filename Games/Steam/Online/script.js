include(["Wine", "QuickScript", "OnlineInstallerScript"]);

new OnlineInstallerScript()
    .name("Steam")
    .editor("Valve")
    .applicationHomepage("http://www.steampowered.com")
    .author("Quentin PÂRIS")
    .url("http://media.steampowered.com/client/installer/SteamSetup.exe")
    .checksum("e930dbdb3bc638f772a8fcd92dbcd0919c924318")
    .category("Games")
    .wineDistribution("staging")
    .wineVersion("2.12")
    .executable("Steam.exe")
    .go();
