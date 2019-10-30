const OriginScript = include("engines.wine.quick_script.origin_script");

new OriginScript()
    .name("Mass Effect 2")
    .editor("Bioware")
    .applicationHomepage("http://masseffect.bioware.com/")
    .author("ZemoScripter")
    .wineVersion("4.0-rc1")
    .wineDistribution("staging")
    .appId(
        "1003291,1005288,1003290,mass_effect_2_de,mass_effect_2_dd,mass_effect_2_fr,mass_effect_2_it,mass_effect_2_pl,mass_effect_2_ce"
    )
    .postInstall(function (wine, wizard) {
        //this must be done while Origin is on, otherwise Origin will simply redownload the .cab files
        wizard.message(
            tr(
                "If you get a DirectX internal error during installation, go to the installation folder and navigate to __Installer/directx/redist and delete all .cab files."
            )
        );
    });
