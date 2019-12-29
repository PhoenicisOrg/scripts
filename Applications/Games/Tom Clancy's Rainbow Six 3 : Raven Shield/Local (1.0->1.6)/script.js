const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const Downloader = include("utils.functions.net.download");

const VirtualDesktop = include("engines.wine.plugins.virtual_desktop");

new LocalInstallerScript()
    .name("Tom Clancy's Rainbow Six 3 : Raven Shield")
    .editor("Red Storm Entertainment")
    .author("ImperatorS79")
    .category("Games")
    .executable("ravenshield.exe")
    .postInstall((wine) => {
        const wizard = wine.wizard();

        var regions = ["France", "England"];
        var selectedRegion = wizard.menu(tr("Select your region for the patch (1.0 to 1.60)."), regions);
        var exeName, url, sha1;
        var originDirectory = wine.prefixDirectory() + "drive_c/users/Public/Documents/";

        switch (selectedRegion.text) {
            case "France":
                exeName = "RVSPatch_1.0_To_1.60_FRA.exe";
                url = "http://ftp.ubi.com/us/games/ravenshield/RVSPatch_1.0_To_1.60_FRA.exe";
                sha1 = "c7eb2c67af17faa29a7f6a0e9b78629365d3e85c";
                break;

            case "England":
                exeName = "raven_shield_v1.00_to_v1.60_uk.exe";
                url = "http://patches.ubi.com/rainbow_six_3_raven_shield/raven_shield_v1.00_to_v1.60_uk.exe";
                sha1 = "9619c735968cd5f79226a972815127813434b8fb";
                break;
        }

        new Downloader()
            .wizard(wizard)
            .url(url)
            .checksum(sha1)
            .to(originDirectory + exeName)
            .get();

        wine.run(originDirectory + exeName);

        new VirtualDesktop(wine).withDimensions(1280, 1024).go();
    });
