include("engines.wine.quick_script.online_installer_script");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.vcrun2017");
include("engines.wine.verbs.xact");

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
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        wine.corefonts();
        wine.vcrun2017(); // Probably needed for self-updater
        wine.xact(); // Required by a couple of games

        // GOG Galaxy doesn't properly install without a symlink between
        // drive_c/ProgramData and drive_c/users/Public
        remove(wine.prefixDirectory() + "/drive_c/users/Public");
        lns(wine.prefixDirectory() + "/drive_c/ProgramData", wine.prefixDirectory() + "/drive_c/users/Public");
    });
