const GogScript = include("engines.wine.quick_script.gog_script");
const {getLatestStableVersion} = include("engines.wine.engine.versions");

new GogScript()
    .name("XIII")
    .editor("Ubisoft")
    .applicationHomepage("https://support.ubi.com/en-US/Games/994")
    .author("Quentin PÂRIS")
    .gogSetupFileNames(["xiii/en1installer0", "xiii/en1installer1", "xiii/en1installer2"])
    .category("Games")
    .wineVersion(getLatestStableVersion())
    .executable("xiii.exe");
