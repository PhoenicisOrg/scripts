const ZipScript = include("engines.wine.quick_script.zip_script");
const Regedit = include("engines.wine.plugins.regedit");

new ZipScript()
    .name("Road Rash")
    .editor("")
    .applicationHomepage("")
    .author("Quentin PÂRIS")
    .url("http://www.bestoldgames.net/download/bgames/road-rash.zip")
    .checksum("82f99038b86bbd267c64f2d34f30b3209bbe4daa")
    .category("Games")
    .executable("RASHME.EXE")
    .postInstall(function (wine) {
        const registryFile = Bean("fileSearcher").search(wine.prefixDirectory(), "RASH.REG");

        new Regedit(wine).open(registryFile[0]);
    });
