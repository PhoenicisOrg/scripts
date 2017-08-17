include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Prey")
    .editor("Arkane Studios")
    .author("Plata")
    .appId(480490)
    .wineVersion("2.14")
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
