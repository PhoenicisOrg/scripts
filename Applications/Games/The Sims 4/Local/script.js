const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");
const AppResource = include("utils.functions.apps.resources");
include("engines.wine.verbs.vcrun6sp6");
include("engines.wine.verbs.mfc42");
include("engines.wine.verbs.dotnet20sp2");
include("engines.wine.verbs.vcrun2010");
include("engines.wine.verbs.vcrun2013");
include("engines.wine.verbs.d9vk");
include("engines.wine.plugins.regedit");

new LocalInstallerScript()
    .name("The Sims 4")
    .editor("Electronic Arts")
    .applicationHomepage("https://www.ea.com/games/the-sims/the-sims-4/pc")
    .author("ZemoScripter")
    .category("Games")
    .executable("TS4_x64.exe")
    .wineArchitecture("amd64")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine) {
        wine.dotnet20sp2();
        wine.vcrun6sp6();
        wine.mfc42();
        wine.vcrun2010();
        wine.vcrun2013();
        wine.D9VK();
        const registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("registry.reg");
        wine.regedit().patch(registrySettings);
        wine.overrideDLL()
            .set("disabled", ["nvapi","nvapi64"])
            .do();
    })
    .environment('{ "STAGING_SHARED_MEMORY": "0", "__GL_SHADER_DISK_CACHE": "1"}')
