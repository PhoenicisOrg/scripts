const OriginScript = include("engines.wine.quick_script.origin_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");
const AppResource = include("utils.functions.apps.resources");
const vcrun6sp6 = include("engines.wine.verbs.vcrun6sp6");
const MFC42 = include("engines.wine.verbs.mfc42");
const dotnet20sp2 = include("engines.wine.verbs.dotnet20sp2");
const vcrun2010 = include("engines.wine.verbs.vcrun2010");
const vcrun2013 = include("engines.wine.verbs.vcrun2013");
const D9VK = include("engines.wine.verbs.d9vk");

include("engines.wine.plugins.regedit");
include("engines.wine.plugins.override_dll");

new OriginScript()
    .name("The Sims 4")
    .editor("Electronic Arts")
    .applicationHomepage("https://www.ea.com/games/the-sims/the-sims-4/pc")
    .author("ZemoScripter")
    .category("Games")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .appId("1011164,1015875,1015876,1015793,1015794,1015795,1015806,1015807,1015808,1018025,1018023,1015236,1015235,1015224")
    .preInstall(function (wine) {
        new dotnet20sp2(wine).go();
        new vcrun6sp6(wine).go();
        new MFC42(wine).go();
        new vcrun2010(wine).go();
        new vcrun2013(wine).go();
        new D9VK(wine).go();
        const registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("registry.reg");
        wine.regedit().patch(registrySettings);
        var configFile = wine.prefixDirectory() + "/drive_c/dxvk.conf";
        touch(configFile);
        writeToFile(configFile, dxgi.nvapiHack = False);
        wine.overrideDLL()
            .set("disabled", ["nvapi", "nvapi64", "OriginThinSetupInternal.exe"])
            .do();
    })
    .environment('{ "STAGING_SHARED_MEMORY": "0", "__GL_SHADER_DISK_CACHE": "1", "DXVK_CONFIG_FILE": "configFile", "PULSE_LATENCY_MSEC": "60"}')
