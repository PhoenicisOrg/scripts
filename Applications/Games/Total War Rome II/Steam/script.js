include("engines.wine.quick_script.steam_script");
include("engines.wine.verbs.d3dx9");
include("engines.wine.verbs.vcrun2005");
include("engines.wine.verbs.vcrun2008");
include("engines.wine.verbs.vcrun2010");

new SteamScript()
    .name("Total War: ROME II")
    .editor("Creative Assembly")
    .author("ImperatorS79")
    .appId(214950)
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .postInstall(function (wine, wizard) {
        wine.d3dx9();
        wine.vcrun2005();
        wine.vcrun2008();
        wine.vcrun2010();
        wizard.message(
            tr(
                "If you are experiencing issues with game (e.g. it crashes at start or rendering is broken), you can try to enable de OpenGL renderer, by modifying :\n\n gfx_device_type to 2\n\n in the {0}/drive_c/users/USERNAME/Application Data/The Creative Assembly/Rome2/scripts/preferences_script.txt",
                wine.prefixDirectory
            )
        );
        //N.B. : maybe need "LD_PRELOAD="libpthread.so.0 libGL.so.1" __GL_THREADED_OPTIMIZATIONS=1" for terrain glitches (OpenGL Mode)
    });
