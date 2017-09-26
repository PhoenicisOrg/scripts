include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("DOOM (2016)")
    .editor("ID Software")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .appId(379720)
    .go();
