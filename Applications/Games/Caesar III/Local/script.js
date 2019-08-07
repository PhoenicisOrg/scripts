const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
include("engines.wine.plugins.virtual_desktop");

new LocalInstallerScript()
    .name("Caesar III")
    .editor("Impressions Games")
    .author("ImperatorS79")
    .category("Games")
    .executable("c3.exe")
    .postInstall(function (wine /*, wizard*/) {
        wine.setVirtualDesktop(1280, 1024);
    });
