const OriginScript = include("engines.wine.quick_script.origin_script");
const vcrun2010 = include("engines.wine.verbs.vcrun2010");
const vcrun2013 = include("engines.wine.verbs.vcrun2013");
const System = Java.type("java.lang.System");
const Extractor = include("utils.functions.filesystem.extract");
const Resource = include("utils.functions.net.resource");
const {touch, writeToFile} = include("utils.functions.filesystem.files");
const D9VK = include("engines.wine.verbs.d9vk");
const OverrideDLL = include("engines.wine.plugins.override_dll");

new OriginScript()
    .name("The Sims 2")
    .editor("Electronic Arts")
    .applicationHomepage("http://thesims2.ea.com")
    .author("ZemoScripter")
    .category("Games")
    .wineVersion("4.20")
    .wineDistribution("upstream")
    .wineArchitecture("amd64")
    .appId("1014457,sims2_apt_life,sims2_bestofbusiness_dd,sims2_bonvoyage_na,sims2dd_remaster,sims2_freetime,sims2_funwpets_dd,sims2_stuffpackglamour_na,sims2_holiday2_na,sims2-holiday,sims2_inseason_na,sims2_collegepack_dd")
    .preInstall(function (wine) {
        new vcrun2010(wine).go();
        new vcrun2013(wine).go();
        new D9VK(wine).go();
        const dxvkConfigFile = wine.prefixDirectory() + "/drive_c/dxvk.conf";
        touch(dxvkConfigFile);
        writeToFile(dxvkConfigFile, "dxgi.nvapiHack = False");
        new OverrideDLL(wine)
            .withMode("disabled", ["nvapi, nvapi64"])
            .go();
    })
    .postInstall(function (wine) {
        const username = System.getProperty("user.name");
        const fixes = new Resource()
            .wizard(wine.wizard())
            .url("https://github.com/tannisroot/installer-fixes/raw/master/sims2_fixes.tar.xz")
            .name("sims2_fixes.tar.xz")
            .get();

        new Extractor()
            .wizard(wine.wizard())
            .archive(fixes)
            .to(wine.prefixDirectory() + "/drive_c/users/" + username + "My Documents/EA Games/The Sims\u2122 2 Ultimate Collection/Downloads")
            .extract();

        const configFile = wine.prefixDirectory() + "drive_c/users/" + username + "My Documents/EA Games/The Sims\u2122 2 Ultimate Collection/Config/userstartup.cheat";
        touch(configFile);
        writeToFile(configFile, "boolprop useshaders true");
    })
    .environment('{ "LARGE_ADDRESS_AWARE": "1", "DXVK_CONFIG_FILE": "configFile"}')
