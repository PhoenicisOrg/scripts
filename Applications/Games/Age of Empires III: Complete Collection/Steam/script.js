const SteamScript = include("engines.wine.quick_script.steam_script");

const Mfc42 = include("engines.wine.verbs.mfc42");

const OverrideDLL = include("engines.wine.plugins.override_dll");

new SteamScript()
    .name("Age of Empires® III: Complete Collection")
    .editor("Microsoft Studios")
    .author("Quentin PARIS")
    .appId(105450)
    .postInstall((wine) => {
        new Mfc42(wine).go();

        new OverrideDLL(wine).withMode("native, builtin", ["pidgen"]).go();
    });
