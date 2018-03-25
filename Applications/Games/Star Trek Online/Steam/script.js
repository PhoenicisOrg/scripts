include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Star Trek Online")
    .editor("Cryptic Studios")
    .author("ImperatorS79")
    .appId(9900)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .go();
