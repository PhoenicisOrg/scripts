include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Styx: Shards of Darkness")
    .editor("Cyanide Studio")
    .author("Plata")
    .appId(355790)
    .wineVersion("2.14")
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
