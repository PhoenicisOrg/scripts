const CustomInstallerScript = include("engines.wine.quick_script.custom_installer_script");

const { LATEST_STAGING_VERSION } = include("engines.wine.engine.versions");
const { fileName, mkdir, writeToFile } = include("utils.functions.filesystem.files");
const Resource = include("utils.functions.net.resource");

const D3DX9 = include("engines.wine.verbs.d3dx9");

const CSMT = include("engines.wine.plugins.csmt");
const OverrideDLL = include("engines.wine.plugins.override_dll");
const WindowsVersion = include("engines.wine.plugins.windows_version");

// Installs League of Legends
new CustomInstallerScript()
    .name("League of Legends")
    .editor("Riot Games")
    .applicationHomepage("http://leagueoflegends.com/")
    .author("Plata, feanor12, Thog")
    .installationCommand(function (wizard) {
        // Select the region and download the setup file
        ////////////////////////////////////////////////
        var regions = [
            "EU West",
            "Latin America North",
            "Latin America South",
            "Oceania",
            "Japan",
            "Turkey",
            "Brasil",
            "EU Nordic & East",
            "North America",
            "Russia"
        ];
        var selectedRegion = wizard.menu(tr("Select your region:"), regions);
        var regionID, url, sha1;
        var baseUrl = "https://riotgamespatcher-a.akamaihd.net/ShellInstaller/";
        switch (selectedRegion.text) {
            case "EU West":
                regionID = "EUW";
                url = baseUrl + "EUW/LeagueofLegends_EUW_Installer_2016_11_10.exe";
                sha1 = "e8cb081395849f3753f8c00d558901b8c3df69e3";
                break;
            case "Latin America North":
                regionID = "LA1";
                url = baseUrl + "LA1/LeagueofLegends_LA1_Installer_2016_05_26.exe";
                sha1 = "996ece64ba2ba9c8b9195c3519a6d7637d82b8d3";
                break;
            case "Latin America South":
                regionID = "LA2";
                url = baseUrl + "LA2/LeagueofLegends_LA2_Installer_2016_05_27.exe";
                sha1 = "5c5e007ee266315b6433dd87e6692753170aab78";
                break;
            case "Oceania":
                regionID = "OC1";
                url = baseUrl + "OC1/LeagueofLegends_OC1_Installer_2016_05_13.exe";
                sha1 = "74b9a327e66fc527edb86e9ea45c9798bdffec5f";
                break;
            case "Japan":
                regionID = "JP";
                url = baseUrl + "JP/LeagueofLegends_JP_Installer_2016_05_31.exe";
                sha1 = "da25b973358837ef9abbb9cb3d55aae214a75de0";
                break;
            case "Turkey":
                regionID = "TR";
                url = baseUrl + "TR/LeagueofLegends_TR_Installer_2016_11_08.exe";
                sha1 = "93fe9b3e581fa5cd41c504ef91ce55e4227b43e3";
                break;
            case "Brasil":
                regionID = "BR";
                url = baseUrl + "BR/LeagueofLegends_BR_Installer_2016_05_13.exe";
                sha1 = "fbef6186cb690b4259e63d53d8c73e556e1d5ddc";
                break;
            case "EU Nordic & East":
                regionID = "EUNE";
                url = baseUrl + "EUNE/LeagueofLegends_EUNE_Installer_2016_11_10.exe";
                sha1 = "17727c665ce59e3faf95c2c0db2fe5509383e750";
                break;
            case "North America":
                regionID = "NA";
                url = baseUrl + "NA/LeagueofLegends_NA_Installer_2016_05_13.exe";
                sha1 = "70a253f29351f1d6952fa1af39fb8b2b01bc6cde";
                break;
            case "Russia":
                regionID = "RU";
                url = baseUrl + "RU/LeagueofLegends_RU_Installer_2016_05_13.exe";
                sha1 = "2d462decf629cab880386407598f9c5ea6db2ef5";
                break;
        }
        var setupFile = new Resource()
            .wizard(wizard)
            .url(url)
            .checksum(sha1)
            .name(fileName(url))
            .get();

        return { command: setupFile, args: ["--installdir", "C:\\LoL\\", "--mode", "unattended"] };
    })
    .category("Games")
    .wineDistribution("staging")
    .wineVersion(LATEST_STAGING_VERSION)
    .preInstall(function (wine) {
        new WindowsVersion(wine).withWindowsVersion("winxp").go();

        new D3DX9(wine).go();

        new OverrideDLL(wine)
            .withMode("native, builtin", ["atl120", "msvcp120", "msvcr120", "vcomp120", "msvcp140"])
            .go();

        new CSMT(wine).go();

        mkdir(wine.prefixDirectory() + "drive_c/LoL");

        // Create run script to start the right exe
        /////////////////////////////////////////
        var client = wine.prefixDirectory() + "drive_c/LoL/run.bat";
        var batContent = "start C:\\LoL\\LeagueClient.exe";
        writeToFile(client, batContent);
    })
    .executable("run.bat");
