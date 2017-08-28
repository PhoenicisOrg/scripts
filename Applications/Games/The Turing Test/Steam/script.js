include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("The Turing Test")
    .editor("Bulkhead Interactive")
    .author("Plata")
    .appId(499520)
    .wineArchitecture("amd64")
    .wineVersion("2.14")
    .go();
