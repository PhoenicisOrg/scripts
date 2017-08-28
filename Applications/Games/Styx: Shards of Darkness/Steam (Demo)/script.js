include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Styx: Shards of Darkness (Demo)")
    .editor("Cyanide Studio")
    .author("Plata")
    .appId(630880)
    .wineVersion("2.14")
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
