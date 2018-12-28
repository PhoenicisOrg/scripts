include(["engines", "wine", "quick_script", "origin_script"]);

var installerImplementation = {
    run: function () {
        new OriginScript()
            .name("Mass Effect 2")
            .editor("Bioware")
            .applicationHomepage("http://masseffect.bioware.com/")
            .author("ZemoScripter")
            .wineVersion("4.0-rc1")
            .wineDistribution("staging")
            .appId("1003291,1005288,1003290,mass_effect_2_de,mass_effect_2_dd,mass_effect_2_fr,mass_effect_2_it,mass_effect_2_pl,mass_effect_2_ce")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
