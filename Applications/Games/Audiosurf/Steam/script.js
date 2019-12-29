const SteamScript = include("engines.wine.quick_script.steam_script");

const QuickTime76 = include("engines.wine.verbs.quicktime76");
const Corefonts = include("engines.wine.verbs.corefonts");
const Tahoma = include("engines.wine.verbs.tahoma");

new SteamScript()
    .name("Audiosurf")
    .editor("Dylan Fitterer")
    .author("Brainzyy")
    .appId(12900)
    .preInstall((wine /*, wizard*/) => {
        new QuickTime76(wine).go();
        new Corefonts(wine).go();
        new Tahoma(wine).go();
    });
