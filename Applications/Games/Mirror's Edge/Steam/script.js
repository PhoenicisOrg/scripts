const SteamScript = include("engines.wine.quick_script.steam_script");

const PhysX = include("engines.wine.verbs.physx");

const Managed = include("engines.wine.plugins.managed");

new SteamScript()
    .name("Mirror's Edge™")
    .editor("DICE")
    .author("Plata")
    .appId(17410)
    .preInstall(function (wine) {
        new PhysX(wine).go();

        new Managed(wine).withManagedApplication("MirrorsEdge.exe", false).go();
    });
