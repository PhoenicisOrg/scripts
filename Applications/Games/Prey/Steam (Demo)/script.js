include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Prey (Demo)")
    .editor("Arkane Studios")
    .author("Plata")
    .appId(609380)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
