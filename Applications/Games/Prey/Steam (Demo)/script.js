include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Prey (Demo)")
    .editor("Arkane Studios")
    .author("Plata")
    .appId(609380)
    .wineVersion("2.14")
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
