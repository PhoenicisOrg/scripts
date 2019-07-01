include("engines.wine.quick_script.online_installer_script");
include("engines.wine.verbs.dxvk");
include("engines.wine.plugins.usetakefocus");

new OnlineInstallerScript()
    .name("Magic: The Gathering Arena")
    .applicationHomepage("https://magic.wizards.com/")
    .url("https://mtgarena.downloads.wizards.com/Live/Windows32/MTGAInstaller.exe")
    .author("KREYREN")
    .category("Games")
    .wineDistribution("staging")
    .wineVersion(LATEST_STAGING_VERSION)
    .preInstall(function (wine /*, wizard*/) {
        wine.DXVK();
        wine.UseTakeFocus("N");
    })
    .executable("MtgaLauncher.exe");
