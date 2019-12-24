const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const DXVK = include("engines.wine.verbs.dxvk");
const TakeFocus = include("engines.wine.plugins.usetakefocus");

new OnlineInstallerScript()
    .name("Magic: The Gathering Arena")
    .applicationHomepage("https://magic.wizards.com/")
    .url("https://mtgarena.downloads.wizards.com/Live/Windows32/MTGAInstaller.exe")
    .author("KREYREN")
    .category("Games")
    .wineDistribution("staging")
    .wineVersion(getLatestStagingVersion())
    .preInstall(function (wine) {
        new DXVK(wine).go();
        new TakeFocus(wine).withMode("N").go();
    })
    .executable("MtgaLauncher.exe");
