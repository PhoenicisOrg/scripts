include("engines.wine.quick_script.local_installer_script");
include("engines.wine.verbs.vcrun2010");
include("engines.wine.verbs.vcrun2013");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");
include("utils.functions.filesystem.extract");
include("utils.functions.apps.resources");

var installerImplementation = {
    run: function () {
        new LocalInstallerScript()
            .name("The Sims 2")
            .editor("Electronic Arts")
            .applicationHomepage("http://thesims2.ea.com")
            .author("ZemoScripter")
            .category("Games")
            .executable("Origin.exe")
            .wineVersion("4.5")
            .wineDistribution("staging")
            .preInstall(function (wine) {
                wine.vcrun2010();
                wine.vcrun2013();
                var registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("registry.reg");
                wine.regedit().patch(registrySettings);
            })
            .postInstall(function (wine) {
                var fixes = new Resource()
                    .wizard(this.wizard())
                    .url("https://raw.githubusercontent.com/tannisroot/installer-fixes/master/sims2_fixes.tar.xz")
                    .name("sims2_fixes.tar.xz")
                    .get();

                new Extractor()
                    .wizard(this.wizard())
                    .archive(fixes)
                    .to(wine.prefixDirectory() + "/drive_c/users/$USER/My Documents/EA Games/The Sims\u2122 2 Ultimate Collection/Downloads")
                    .extract();
                var configFile = wine.prefixDirectory() + "drive_c/users/$USER/My Documents/EA Games/The Sims\u2122 2 Ultimate Collection/Config/userstartup.cheat";
                touch(configFile);
                writeToFile(configFile, "boolprop useshaders true\nboolProp   createNVidiaWorkaroundTexture false\nboolProp   bumpMapping false");
            })

            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
