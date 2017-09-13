include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Assassin’s Creed® Unity")
    .editor("Ubisoft")
    .author("Plata")
    .appId(289650)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
