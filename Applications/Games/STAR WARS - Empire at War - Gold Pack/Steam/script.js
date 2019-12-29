const SteamScript = include("engines.wine.quick_script.steam_script");
const D3DX9 = include("engines.wine.verbs.d3dx9");

new SteamScript()
    .name("STAR WARS™ Empire at War: Gold Pack")
    .editor("Petroglyph")
    .author("ImperatorS79")
    .appId(32470)
    .preInstall((wine /*, wizard*/) => {
        new D3DX9(wine).go();
    });
