include("engines.wine.quick_script.online_installer_script");
include("engines.wine.verbs.dotnet472"); // Use always latest!
include("engines.wine.verbs.dxvk");
include("engines.wine.plugins.windows_version");

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Vortex")
            .editor("NexusMods")
            .applicationHomepage("https://www.nexusmods.com/site/mods/1?tab=description")
            .author("KREYREN")
            // .url("https://www.nexusmods.com/Core/Libs/Common/Widgets/DownloadPopUp?id=159&game_id=2295&source=FileExpander") // For Vortex without custom install
            // TODO: Add option for other url if required.
            .url("https://github.com/Nexus-Mods/Vortex/releases/download/v0.17.10/vortex-setup-0.17.10.exe") // Source on https://github.com/Nexus-Mods/Vortex/releases
            // TODO: Always download latest release!
            .checksum("ab801475be427bb3c051ba7832704f482a6d1f4d") // Based on https://www.virustotal.com/#/file/7506b827c92e0052d66a4b191272764604538508ae75f3afe4747f69479d0aa8/details
            .category("Development")
            .wineVersion(LATEST_STAGING_VERSION)
            .wineDistribution("staging")
            .wineArchitecture("amd64")
            .executable("vortex-setup-0.17.10.exe")
            .preInstall(function (wine /*, wizard*/) {
                wine.dotnet472(); // dotnet 4.6+ required
                wine.dxvk(); // STUB: Only dxgi.dll is required.
                wine.windowsVersion("win7");
              })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
