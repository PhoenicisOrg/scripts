include(["Engines", "Wine", "QuickScript", "SteamScript"]);

new SteamScript()
    .name("Dragon Ball Xenoverse")
    .editor("DIMPS")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .appId(323470)
    .preInstall(function(wine, wizard) {
        wine.enableCSMT();
    })
    .go();
