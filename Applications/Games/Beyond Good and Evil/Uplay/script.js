const UplayScript = include("engines.wine.quick_script.uplay_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new UplayScript()
    .name("Beyond Good and Evil™")
    .applicationHomepage("http://store.ubi.com/de/beyond-good-and-evil/56c4948388a7e300458b470a.html")
    .editor("Ubisoft")
    .author("Plata")
    .appId(232)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging");
