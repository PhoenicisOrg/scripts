const OriginScript = include("engines.wine.quick_script.origin_script");
const vcrun2010 = include("engines.wine.verbs.vcrun2010");
const vcrun2013 = include("engines.wine.verbs.vcrun2013");
const AppResource = include("utils.functions.apps.resources");

include("utils.functions.net.resource");
include("utils.functions.filesystem.files");
include("utils.functions.filesystem.extract");

new OriginScript()
    .name("The Sims 2")
    .editor("Electronic Arts")
    .applicationHomepage("http://thesims2.ea.com")
    .author("ZemoScripter")
    .category("Games")
    .wineVersion("4.5")
    .wineDistribution("staging")
    .appId("1014457,sims2_apt_life,sims2_bestofbusiness_dd,sims2_bonvoyage_na,sims2dd_remaster,sims2_freetime,sims2_funwpets_dd,sims2_stuffpackglamour_na,sims2_holiday2_na,sims2-holiday,sims2_inseason_na,sims2_collegepack_dd")
    .preInstall(function (wine) {
        new vcrun2010(wine).go();
        new vcrun2013(wine).go();
        var registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("registry.reg");
        wine.regedit().patch(registrySettings);
    })
    .postInstall(function (wine) {
        var fixes = new Resource()
            .wizard(wine.wizard())
            .url("https://raw.githubusercontent.com/tannisroot/installer-fixes/master/sims2_fixes.tar.xz")
            .name("sims2_fixes.tar.xz")
            .get();
        var username = java.lang.System.getenv("USERNAME")
        new Extractor()
            .wizard(wine.wizard())
            .archive(fixes)
            .to(wine.prefixDirectory() + "/drive_c/users/" + username + "My Documents/EA Games/The Sims\u2122 2 Ultimate Collection/Downloads")
            .extract();
        const configFile = wine.prefixDirectory() + "drive_c/users/" + username + "My Documents/EA Games/The Sims\u2122 2 Ultimate Collection/Config/userstartup.cheat";
        touch(configFile);
        writeToFile(configFile, "boolprop useshaders true\nboolProp   createNVidiaWorkaroundTexture false\nboolProp   bumpMapping false");
    })
