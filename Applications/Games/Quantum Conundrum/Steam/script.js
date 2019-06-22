include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.vcrun2008");

new SteamScript()
    .name("Quantum Conundrum")
    .editor("Square Enix")
    .author("Plata")
    .appId(200010)
    .preInstall(function (wine /*, wizard*/) {
        wine.vcrun2008();
    });
