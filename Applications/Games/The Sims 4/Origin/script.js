const OriginScript = include("engines.wine.quick_script.origin_script");
const vcrun2010 = include("engines.wine.verbs.vcrun2010");
const vcrun2013 = include("engines.wine.verbs.vcrun2013");
const vcrun2015 = include("engines.wine.verbs.vcrun2015");
const D9VK = include("engines.wine.verbs.d9vk");
const { touch, writeToFile } = include("utils.functions.filesystem.files");
const OverrideDLL = include("engines.wine.plugins.override_dll");

new OriginScript()
    .name("The Sims 4")
    .editor("Electronic Arts")
    .applicationHomepage("https://www.ea.com/games/the-sims/the-sims-4/pc")
    .author("ZemoScripter")
    .category("Games")
    .wineVersion("4.21")
    .wineDistribution("upstream")
    .wineArchitecture("amd64")
    .appId("1011164,1015875,1015876,1015793,1015794,1015795,1015806,1015807,1015808,1018025,1018023,1015236,1015235,1015224")
    .preInstall(function (wine) {
        new vcrun2010(wine).go();
        new vcrun2013(wine).go();
        new vcrun2015(wine).go();
        new D9VK(wine).go();
        const configFile = wine.prefixDirectory() + "/drive_c/dxvk.conf";
        touch(configFile);
        writeToFile(configFile, "dxgi.nvapiHack = False");
        new OverrideDLL(wine)
            .withMode("disabled", ["nvapi, nvapi64"])
            .go();
    })
    .environment('{ "STAGING_SHARED_MEMORY": "0", "__GL_SHADER_DISK_CACHE": "1", "DXVK_CONFIG_FILE": "configFile"}')
