include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.dotnet40");

new SteamScript()
    .name("QUBE: Director's Cut")
    .editor("Toxic Games")
    .author("Plata")
    .appId(239430)
    .preInstall(function (wine /*, wizard*/) {
        wine.dotnet40();
    });
