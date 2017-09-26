include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Assassin’s Creed® III")
    .editor("Ubisoft Montreal")
    .author("Plata")
    .appId(208480)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .go();
