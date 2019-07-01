include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.override_dll");
include("engines.wine.verbs.mfc42");

new SteamScript()
    .name("Age of Empires® III: Complete Collection")
    .editor("Microsoft Studios")
    .author("Quentin PARIS")
    .appId(105450)
    .postInstall(function (wine /*, wizard*/) {
        wine.mfc42();
        wine
            .overrideDLL()
            .set("native, builtin", ["pidgen"])
            .do();
    });
