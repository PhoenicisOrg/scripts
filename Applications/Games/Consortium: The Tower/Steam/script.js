include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Consortium: The Tower")
    .editor("Interdimensional Games Inc")
    .author("Plata")
    .appId(626250)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
