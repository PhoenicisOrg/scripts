const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const DXVK = include("engines.wine.verbs.dxvk");

new SteamScript()
    .name("The Witcher 3: Wild Hunt")
    .editor("CD Projekt Red")
    .author("ImperatorS79")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .appId(292030)
    .preInstall((wine, wizard) => {
        wizard.message(
            tr(
                "Please ensure you have the latest drivers (415.25 minimum for NVIDIA and mesa 19 for AMD) or else this game will not work."
            )
        );

        new DXVK(wine).go();
    });
