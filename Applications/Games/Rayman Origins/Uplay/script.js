const UplayScript = include("engines.wine.quick_script.uplay_script");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

new UplayScript()
    .name("Rayman® Origins")
    .applicationHomepage("http://store.ubi.com/de/rayman-origins/5704fac688a7e32b078b4676.html")
    .editor("UBIart Montpellier")
    .author("Plata")
    .appId(80)
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging");
