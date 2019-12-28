const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");

const { getLatestStagingVersion } = include("engines.wine.engine.versions");

const CSMT = include("engines.wine.plugins.csmt");
const WindowsVersion = include("engines.wine.plugins.windows_version");
const D3DX9 = include("engines.wine.verbs.d3dx9");

new LocalInstallerScript()
    .name("Command and Conquer - Tiberium Wars")
    .editor("SAGE")
    .author("qdii")
    .category("Games")
    .executable("CNC3.exe")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging")
    .preInstall((wine) => {
        new WindowsVersion(wine).withWindowsVersion("winxp").go();

        new D3DX9(wine).go();
        new CSMT(wine).go();
    });
