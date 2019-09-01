const SteamScript = include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.override_dll");
const Mfc42 = include("engines.wine.verbs.mfc42");

new SteamScript()
    .name("Age of Empires® III: Complete Collection")
    .editor("Microsoft Studios")
    .author("Quentin PARIS")
    .appId(105450)
    .postInstall(function (wine /*, wizard*/) {
        new Mfc42(wine).go();

        wine.overrideDLL()
            .set("native, builtin", ["pidgen"])
            .do();
    });
