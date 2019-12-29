const ZipScript = include("engines.wine.quick_script.zip_script");
const { getLatestDevelopmentVersion } = include("engines.wine.engine.versions");

new ZipScript()
    .name("Hourglass (Demo)")
    .editor("Ben Braß")
    .applicationHomepage("https://hourglass.itch.io/hourglass")
    .author("Plata")
    .executable("Hourglass Gameplay Demo.exe")
    .wineVersion(getLatestDevelopmentVersion)
    .wineArchitecture("amd64");
