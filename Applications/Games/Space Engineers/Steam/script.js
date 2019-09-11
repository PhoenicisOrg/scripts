const SteamScript = include("engines.wine.quick_script.steam_script");
const DotNET472 = include("engines.wine.verbs.dotnet472");
const Vcrun2017 = include("engines.wine.verbs.vcrun2017");
const DXVK = include("engines.wine.verbs.dxvk");

include("engines.wine.plugins.override_dll");

new SteamScript()
    .name("Space Engineers")
    .editor("Keen Software House")
    .author("Zemogiter")
    .appId(244850)
    .wineVersion("4.15")
    .wineDistribution("upstream")
    .wineArchitecture("amd64")
    .preInstall(function (wine, wizard) {
        new DotNET472(wine).go();
        new Vcrun2017(wine).go();
        new DXVK(wine).go();
        wine.overrideDLL()
            .set("native, builtin", ["msvcr120"])
            .do();
        wizard.message(tr("You have to install libjpeg62 package or else the thumbnails in New Game menu will be dispalyed as magenta rectangles."));
        wizard.message(tr("Due to JIT compiler issues and the way this game uses multithreating, there are audio stutters. To minimize those (assuming you are on a Debian-based Linux distribution), download the libFAudio package from this PPA:\nhttps://launchpad.net/~cybermax-dexter/+archive/ubuntu/sdl2-backport"));
    })
    .executable("Steam.exe", ["-silent", "-applaunch", "244850", "-no-cef-sandbox", "-skipintro"]);
