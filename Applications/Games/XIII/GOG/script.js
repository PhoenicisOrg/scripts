include("engines.wine.quick_script.gog_script");

new GogScript()
    .name("XIII")
    .editor("Ubisoft")
    .applicationHomepage("https://support.ubi.com/en-US/Games/994")
    .author("Quentin PÂRIS")
    .gogSetupFileNames(["xiii/en1installer0", "xiii/en1installer1", "xiii/en1installer2"])
    .category("Games")
    .wineVersion(LATEST_STABLE_VERSION)
    .executable("xiii.exe");
