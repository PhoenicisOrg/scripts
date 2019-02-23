include("engines.wine.quick_script.origin_script");

var installerImplementation = {
    run: function () {
        new OriginScript()
            .name("Spore")
            .editor("Maxis")
            .author("Zemogiter")
            .applicationHomepage("http://www.spore.com/")
            .category("Games")
            .wineVersion("3.19")
            .wineDistribution("staging")
            .appId()
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
