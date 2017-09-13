include(["Engines", "Wine", "QuickScript", "SteamScript"]);

include(["Engines", "Wine", "Verbs", "dotnet40"]);

new SteamScript()
    .name("Unholy Heights")
    .editor("AGM PLAYISM")
    .author("madoar")
    .appId(249330)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine, wizard) {
        wine.dotnet40();
    })
    .go();
