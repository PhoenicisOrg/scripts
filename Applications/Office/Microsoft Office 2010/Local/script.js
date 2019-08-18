const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const WineShortcut = include("engines.wine.shortcuts.wine");

include("engines.wine.plugins.override_dll");

new LocalInstallerScript()
    .name("Microsoft Office 2010")
    .editor("Microsoft")
    .author("ImperatorS79")
    .category("Office")
// exe set with WineShorcut
    .postInstall(function (wine /*, wizard*/) {
        wine
            .overrideDLL()
            .set("native, builtin", ["riched20"])
            .do();

        new WineShortcut()
            .name("Microsoft Word 2010")
            .prefix("Microsoft Office 2010")
            .search("WINWORD.EXE")
            .miniature(["Office", "Microsoft Office 2010"])
            .create();

        new WineShortcut()
            .name("Microsoft Excel 2010")
            .prefix("Microsoft Office 2010")
            .search("EXCEL.EXE")
            .miniature(["Office", "Microsoft Office 2010"])
            .create();

        new WineShortcut()
            .name("Microsoft PowerPoint 2010")
            .prefix("Microsoft Office 2010")
            .search("POWERPNT.EXE")
            .miniature(["Office", "Microsoft Office 2010"])
            .create();

        new WineShortcut()
            .name("Microsoft OneNote 2010")
            .prefix("Microsoft Office 2010")
            .search("ONENOTE.EXE")
            .miniature(["Office", "Microsoft Office 2010"])
            .create();

        new WineShortcut()
            .name("Microsoft Outlook 2010")
            .prefix("Microsoft Office 2010")
            .search("OUTLOOK.EXE")
            .miniature(["Office", "Microsoft Office 2010"])
            .create();
    });
