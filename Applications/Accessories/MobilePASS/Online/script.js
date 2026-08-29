const PlainInstaller = include("utils.functions.apps.plain_installer");

const Downloader = include("utils.functions.net.download");
const { createTempFile, cp, mkdir } = include("utils.functions.filesystem.files");

const Wine = include("engines.wine.engine.object");
const { getLatestStableVersion } = include("engines.wine.engine.versions");
const WineShortcut = include("engines.wine.shortcuts.wine");

new PlainInstaller().withScript(() => {
    const appsManager = Bean("repositoryManager");
    const application = appsManager.getApplication([
        TYPE_ID,
        CATEGORY_ID,
        APPLICATION_ID,
    ]);
    const setupWizard = SetupWizard(
        InstallationType.APPS,
        "SafeNet MobilePASS",
        application.getMainMiniature()
    );

    setupWizard.presentation(
        "SafeNet MobilePASS",
        "SafeNet",
        "https://safenetmp.com/",
        "Kolja Lampe"
    );

    const tempFile = createTempFile("exe");

    new Downloader()
        .wizard(setupWizard)
        .url("https://fdsext.gemalto.com/filesSN/Index/79cca6a24fcc41c48a6dc31162a9ee7e?sid=6aded7501b842c50f12064606e4bcbaf.exe")
        .checksum("b804feb434dd7fbed5f73508279f2362b3d1badd")
        .to(tempFile)
        .get();

    const wine = new Wine()
        .wizard(setupWizard)
        .prefix(
            "MobilePass",
            "upstream",
            "x86",
            getLatestStableVersion(setupWizard, null, null, "x86")
        )
        .create();

    mkdir(wine.prefixDirectory() + "MobilePass");
    cp(tempFile, wine.prefixDirectory() + "/drive_c/MobilePass/MobilePASS.exe");

    new WineShortcut()
        .name("SafeNet MobilePASS")
        .prefix("MobilePass")
        .search("MobilePASS.exe")
        .miniature([TYPE_ID, CATEGORY_ID, APPLICATION_ID])
        .create();

    setupWizard.close();
});
