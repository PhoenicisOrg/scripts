const GogScript = include("engines.wine.quick_script.gog_script");
const { getLatestDosSupportVersion } = include("engines.wine.engine.versions");

new GogScript()
    .name("Teenagent")
    .editor("")
    .applicationHomepage("")
    .author("Quentin PÂRIS")
    .gogSetupFileName("teenagent/en1installer0")
    .category("Games")
    .wineVersion(getLatestDosSupportVersion)
    .wineDistribution("dos_support")
    .executable("TEENAGNT.EXE");
