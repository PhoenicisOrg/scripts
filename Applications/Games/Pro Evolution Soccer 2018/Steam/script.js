include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Pro Evolution Soccer 2018")
    .editor("Konami Digital Entertainment Co., Ltd.")
    .author("Plata")
    .appId(592580)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
