const ZipScript = include("engines.wine.quick_script.zip_script");
const {LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");

new ZipScript()
    .name("Xenon 2")
    .editor("")
    .applicationHomepage("")
    .author("Quentin PÂRIS")
    .url("https://repository.playonlinux.com/divers/oldware/Xenon2.zip")
    .checksum("9b61e88cad02f663e76fe40a379319a4956546c2")
    .category("Games")
    .wineVersion(LATEST_DOS_SUPPORT_VERSION)
    .wineDistribution("dos_support")
    .executable("XENON2.EXE");
