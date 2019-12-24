const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");
const { remove, lns } = include("utils.functions.filesystem.files");

const Corefonts = include("engines.wine.verbs.corefonts");
const Vcrun2017 = include("engines.wine.verbs.vcrun2017");
const Xact = include("engines.wine.verbs.xact");

new OnlineInstallerScript()
    .name("GOG Galaxy")
    .category("Games")
    .editor("GOG.com")
    .applicationHomepage("https://www.gog.com/")
    .author("Markus Ebner")
    .url("https://content-system.gog.com/open_link/download?path=/open/galaxy/client/setup_galaxy_1.2.51.30.exe")
    .checksum("faa29721de18a171561a3e4dfa243953ff98aa09")
    .executable("GalaxyClient.exe")
    .wineArchitecture("amd64")
    .wineVersion(getLatestStagingVersion())
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        new Corefonts(wine).go();
        // Probably needed for self-updater
        new Vcrun2017(wine).go();
        // Required by a couple of games
        new Xact(wine).go();

        // GOG Galaxy doesn't properly install without a symlink between
        // drive_c/ProgramData and drive_c/users/Public
        remove(wine.prefixDirectory() + "/drive_c/users/Public");
        lns(wine.prefixDirectory() + "/drive_c/ProgramData", wine.prefixDirectory() + "/drive_c/users/Public");
    });
