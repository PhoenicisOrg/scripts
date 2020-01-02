const ZipScript = include("engines.wine.quick_script.zip_script");
const { getLatestDosSupportVersion } = include("engines.wine.engine.versions");

new ZipScript()
    .name("Prehistorik")
    .editor("Titus")
    .applicationHomepage("")
    .author("Quentin PÂRIS")
    .url("https://repository.playonlinux.com/divers/oldware/historik.zip")
    .checksum("62a21d0dfcd68ae61646e1bc5b1c4a03b3e1091f")
    .category("Games")
    .wineVersion(getLatestDosSupportVersion)
    .wineDistribution("dos_support")
    .executable("HISTORIK.EXE");
