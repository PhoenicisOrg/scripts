const SteamScript = include("engines.wine.quick_script.steam_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const D3DX9 = include("engines.wine.verbs.d3dx9");
const Vcrun2005 = include("engines.wine.verbs.vcrun2005");
const Vcrun2008 = include("engines.wine.verbs.vcrun2008");
const Vcrun2010 = include("engines.wine.verbs.vcrun2010");

new SteamScript()
    .name("Total War: ROME II")
    .editor("Creative Assembly")
    .author("ImperatorS79")
    .appId(214950)
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .environment('{"__GL_THREADED_OPTIMIZATIONS": "1", "LD_PRELOAD" = "libpthread.so.0 libGL.so.1"}')
    .postInstall((wine, wizard) => {
        new D3DX9(wine).go();
        new Vcrun2005(wine).go();
        new Vcrun2008(wine).go();
        new Vcrun2010(wine).go();

        wizard.message(
            tr(
                "If you are experiencing issues with game (e.g. it crashes at start or rendering is broken), you can try to enable de OpenGL renderer, by modifying :\n\n gfx_device_type to 2\n\n in the wine.prefixDirectory()/drive_c/users/USERNAME/Application Data/The Creative Assembly/Rome2/scripts/preferences_script.txt",
            )
        );
    });
