const UplayScript = include("engines.wine.quick_script.uplay_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new UplayScript()
    .name("Prince of Persia®: The Sands of Time")
    .applicationHomepage("http://store.ubi.com/de/prince-of-persia--sands-of-time/5704fac588a7e32b078b466a.html")
    .editor("Kudosoft")
    .author("Plata")
    .appId(111)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging");
