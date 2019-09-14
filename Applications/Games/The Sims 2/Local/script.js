const LocalScript = include("engines.wine.quick_script.local_installer_script");
const AppResource = include("utils.functions.apps.resources");
const vcrun2010 = include("engines.wine.verbs.vcrun2010");
const vcrun2013 = include("engines.wine.verbs.vcrun2013");

include("utils.functions.net.resource");
include("utils.functions.filesystem.files");
include("utils.functions.filesystem.extract");

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
        new vcrun2010(wine).go();
        new vcrun2013(wine).go();
        const registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("registry.reg");
        wine.regedit().patch(registrySettings);
     })
    .postInstall(function (wine) {
        const fixes = new Resource()
            .wizard(wine.wizard())
            .url("https://raw.githubusercontent.com/tannisroot/installer-fixes/master/sims2_fixes.tar.xz")
            .name("sims2_fixes.tar.xz")
            .get();
        const username = java.lang.System.getenv("USERNAME")
        new Extractor()
            .wizard(wine.wizard())
            .archive(fixes)
            .to(wine.prefixDirectory() + "/drive_c/users/" + username + "My Documents/EA Games/The Sims\u2122 2 Ultimate Collection/Downloads")
            .extract();
        const configFile = wine.prefixDirectory() + "drive_c/users/" + username + "My Documents/EA Games/The Sims\u2122 2 Ultimate Collection/Config/userstartup.cheat";
        touch(configFile);
        writeToFile(configFile, "boolprop useshaders true\nboolProp   createNVidiaWorkaroundTexture false\nboolProp   bumpMapping false");
    })
