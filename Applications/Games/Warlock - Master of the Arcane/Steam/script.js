include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.d3dx9");
include("engines.wine.verbs.tahoma");
include("engines.wine.verbs.vcrun2005");
include("engines.wine.verbs.vcrun2008");

new SteamScript()
    .name("Warlock - Master of the Arcane")
    .editor("Paradox Interactive")
    .author("madoar")
    .appId(203630)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine /*, wizard*/) {
        wine.corefonts();
        wine.d3dx9();
        wine.tahoma();
        wine.vcrun2005();
        wine.vcrun2008();
    });
