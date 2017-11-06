include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Dragon Ball Xenoverse 2")
    .editor("QLOC, DIMPS")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .appId(454650)
    .preInstall(function(wine, wizard) {
        wine.enableCSMT();
    })
    .go();
