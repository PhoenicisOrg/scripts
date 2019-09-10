const SteamScript = include("engines.wine.quick_script.steam_script");
include("engines.wine.plugins.managed");
const DotNET40 = include("engines.wine.verbs.dotnet40");

new SteamScript()
    .name("Niko: Through The Dream")
    .editor("Studio Paint")
    .author("Plata")
    .appId(296550)
    .postInstall(function (wine /*, wizard*/) {
        new DotNET40(wine).go();
        wine
            .setManagedForApplication()
            .set("NIKO.exe", false)
            .do();
    });
