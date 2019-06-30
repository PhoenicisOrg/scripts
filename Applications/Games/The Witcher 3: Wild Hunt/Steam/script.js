include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.dxvk");

new SteamScript()
    .name("The Witcher 3: Wild Hunt")
    .editor("CD Projekt Red")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .appId(292030)
    .preInstall(function (wine, wizard) {
        wizard.message(
            tr(
                "Please ensure you have the latest drivers (415.25 minimum for NVIDIA and mesa 19 for AMD) or else this game will not work."
            )
        );
        wine.DXVK();
    });
