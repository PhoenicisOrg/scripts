const SteamScript = include("engines.wine.quick_script.steam_script");

const DotNET40 = include("engines.wine.verbs.dotnet40");

const Managed = include("engines.wine.plugins.managed");

new SteamScript()
    .name("Niko: Through The Dream")
    .editor("Studio Paint")
    .author("Plata")
    .appId(296550)
    .postInstall(function (wine) {
        new DotNET40(wine).go();

        new Managed(wine).withManagedApplication("NIKO.exe", false).go();
    });
