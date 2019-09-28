const SteamScript = include("engines.wine.quick_script.steam_script");
const VirtualDesktop = include("engines.wine.plugins.virtual_desktop");

new SteamScript()
    .name("Caesar III")
    .editor("Impressions Games")
    .author("ImperatorS79")
    .appId(517790)
    .postInstall(function (wine) {
        new VirtualDesktop(wine).withDimensions(1280, 1024).go();
    });
