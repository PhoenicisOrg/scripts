const ZipScript = include("engines.wine.quick_script.zip_script");
const {writeToFile} = include("utils.functions.filesystem.files");
const {LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");

include("engines.wine.plugins.dos_support");

new ZipScript()
    .name("The Elder Scroll 1: Arena")
    .editor("Broderbund Softwared")
    .applicationHomepage("https://elderscrolls.bethesda.net/fr/arena")
    .author("Quentin PÂRIS")
    .url("http://static.elderscrolls.com/elderscrolls.com/assets/files/tes/extras/Arena106Setup.zip")
    .checksum("5e51d43f3e01820b18df36ec0019036f16796ad2")
    .category("Games")
    .wineVersion(LATEST_DOS_SUPPORT_VERSION)
    .wineDistribution("dos_support")
    .postInstall(function (wine) {
        wine.run(
            wine.prefixDirectory() + "/drive_c/The Elder Scroll 1: Arena/Arena106.exe",
            [],
            wine.prefixDirectory(),
            false,
            true
        );

        writeToFile(
            wine.prefixDirectory() + "/drive_c/ARENA/ARENA.BAT",
            "@ECHO OFF\r\n" + "A -sa:220 -si:7 -sd:1 -ma:220 -mq:7 -md:1 -ssbdig.adv -msbfm.adv\n\n" + "EXIT"
        );

        wine
            .dosbox()
            .memSize(64)
            .renderAspect(true)
            .cpuCycles("max 95% limit 33000")
            .renderFrameSkip(1);
    })
    .executable("ARENA.BAT");
