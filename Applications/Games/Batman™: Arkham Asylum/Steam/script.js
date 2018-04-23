include(["engines", "wine", "quick_script", "steam_script"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Batman™: Arkham Asylum")
            .editor("Rocksteady Studios")
            .author("ImperatorS79")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .appId(35140)
            .postInstall(function (wine, wizard) {
                wine.UseGLSL("disabled");
                wine.enableCSMT();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
