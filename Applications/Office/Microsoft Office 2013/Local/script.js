const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");

const WineShortcut = include("engines.wine.shortcuts.wine");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const OverrideDLL = include("engines.wine.plugins.override_dll");

new LocalInstallerScript()
    .name("Microsoft Office 2013")
    .editor("Microsoft")
    .applicationHomepage("https://products.office.com/fr-be/microsoft-office-2013")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .author("ImperatorS79")
    .category("Office")
    // exe set with WineShorcut
    .postInstall(function (wine) {
        new OverrideDLL(wine).withMode("native, builtin", ["riched20"]).go();

        new WineShortcut()
            .name("Microsoft Word 2013")
            .prefix("Microsoft Office 2013")
            .search("WINWORD.EXE")
            .miniature(["Office", "Microsoft Office 2013"])
            .create();

        new WineShortcut()
            .name("Microsoft Excel 2013")
            .prefix("Microsoft Office 2013")
            .search("EXCEL.EXE")
            .miniature(["Office", "Microsoft Office 2013"])
            .create();

        new WineShortcut()
            .name("Microsoft PowerPoint 2013")
            .prefix("Microsoft Office 2013")
            .search("POWERPNT.EXE")
            .miniature(["Office", "Microsoft Office 2013"])
            .create();

        new WineShortcut()
            .name("Microsoft OneNote 2013")
            .prefix("Microsoft Office 2013")
            .search("ONENOTE.EXE")
            .miniature(["Office", "Microsoft Office 2013"])
            .create();

        new WineShortcut()
            .name("Microsoft Outlook 2013")
            .prefix("Microsoft Office 2013")
            .search("OUTLOOK.EXE")
            .miniature(["Office", "Microsoft Office 2013"])
            .create();
    });
