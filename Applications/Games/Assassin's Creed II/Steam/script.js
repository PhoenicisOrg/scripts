include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Assassin’s Creed II")
    .editor("Ubisoft Montreal")
    .author("Plata")
    .appId(33230)
    .wineVersion("2.16")
    .wineDistribution("staging")
    .go();
