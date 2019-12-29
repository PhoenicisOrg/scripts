const UplayScript = include("engines.wine.quick_script.uplay_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

new UplayScript()
    .name("Far Cry 3 - Blood Dragon")
    .applicationHomepage("http://store.ubi.com/de/far-cry--3---blood-dragon/57062ebf88a7e316728b4626.html")
    .editor("Ubisoft Montreal")
    .author("Plata")
    .appId(205)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging");
