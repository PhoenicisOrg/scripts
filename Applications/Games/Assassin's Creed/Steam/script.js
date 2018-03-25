include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Assassin's Creed™")
    .editor("Ubisoft Montréal")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .appId(15100)
    .go();
