include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Red Trigger")
    .editor("Maxime Vézina")
    .author("Plata")
    .appId(491130)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .go();
