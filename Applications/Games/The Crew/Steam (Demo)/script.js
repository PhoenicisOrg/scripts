include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("The Crew™ (Demo)")
    .editor("Ivory Tower in collaboration with Ubisoft Reflections")
    .author("Plata")
    .appId(366310)
    .wineVersion("2.14")
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
