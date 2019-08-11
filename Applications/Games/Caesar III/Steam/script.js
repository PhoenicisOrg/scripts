const SteamScript = include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.virtual_desktop");

new SteamScript()
    .name("Caesar III")
    .editor("Impressions Games")
    .author("ImperatorS79")
    .appId(517790)
    .postInstall(function (wine /*, wizard*/) {
        wine.setVirtualDesktop(1280, 1024);
    });
