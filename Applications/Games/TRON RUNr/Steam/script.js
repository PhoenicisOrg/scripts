include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("TRON RUN/r")
    .editor("Sanzaru Games Inc.")
    .author("Plata")
    .appId(392000)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
