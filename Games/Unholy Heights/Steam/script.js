include(["Functions", "QuickScript", "SteamScript"]);

include(["Functions", "Verbs", "dotnet40"]);

new SteamScript()
    .name("Unholy Heights")
    .editor("AGM PLAYISM")
    .author("madoar")
    .appId(249330)
    .wineVersion("2.10")
    .wineDistribution("staging")
    .preInstall(function (wine, wizard) {
        wine.dotnet40();
    })
    .go();
