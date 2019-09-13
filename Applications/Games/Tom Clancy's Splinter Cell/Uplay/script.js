const UplayScript = include("engines.wine.quick_script.uplay_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");

new UplayScript()
    .name("Tom Clancy's Splinter Cell®")
    .applicationHomepage("http://store.ubi.com/de/tom-clancy-s-splinter-cell/5704fac888a7e32b078b469c.html")
    .editor("Ubisoft")
    .author("Plata")
    .appId(109)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging");
