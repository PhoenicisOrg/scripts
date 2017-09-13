include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("TRON RUN/r (Demo)")
    .editor("Sanzaru Games Inc.")
    .author("Plata")
    .appId(436130)
    .wineVersion("2.16")
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
