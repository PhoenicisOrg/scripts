include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.quicktime76");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.tahoma");

new SteamScript()
    .name("Audiosurf")
    .editor("Dylan Fitterer")
    .author("Brainzyy")
    .appId(12900)
    .preInstall(function (wine /*, wizard*/) {
        wine.quicktime76();
        wine.corefonts();
        wine.tahoma();
    });
