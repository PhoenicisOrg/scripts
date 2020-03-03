const SteamScript = include("engines.wine.quick_script.steam_script");

const Vcrun2008 = include("engines.wine.verbs.vcrun2008");

new SteamScript()
    .name("Quantum Conundrum")
    .editor("Square Enix")
    .author("Plata")
    .appId(200010)
    .preInstall((wine /*, wizard*/) => {
        new Vcrun2008(wine).go();
    });
