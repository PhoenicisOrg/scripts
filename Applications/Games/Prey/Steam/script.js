include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Prey")
    .editor("Arkane Studios")
    .author("Plata")
    .appId(480490)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
