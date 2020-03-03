const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const Corefonts = include("engines.wine.verbs.corefonts");
const D3DX9 = include("engines.wine.verbs.d3dx9");
const Tahoma = include("engines.wine.verbs.tahoma");
const Vcrun2005 = include("engines.wine.verbs.vcrun2005");
const Vcrun2008 = include("engines.wine.verbs.vcrun2008");

new SteamScript()
    .name("Warlock - Master of the Arcane")
    .editor("Paradox Interactive")
    .author("madoar")
    .appId(203630)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .preInstall((wine /*, wizard*/) => {
        new Corefonts(wine).go();
        new D3DX9(wine).go();
        new Tahoma(wine).go();
        new Vcrun2005(wine).go();
        new Vcrun2008(wine).go();
    });
