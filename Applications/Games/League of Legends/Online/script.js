include("engines.wine.quick_script.custom_installer_script");
include("engines.wine.shortcuts.wine");
include("engines.wine.verbs.sandbox");
include("engines.wine.verbs.d3dx9");
include("engines.wine.verbs.dxv9");

// Install League Of Legends using DXV9

var installerImplementation = {
    run: function () {
        var regionID, url;
        new CustomInstallerScript()
            .name("League of Legends")
            .editor("Riot Games")
            .applicationHomepage("http://leagueoflegends.com/")
            .author("Plata, feanor12, Thog, TheRuntimeIsNotWorkingRey, ImperatorS79, Zemogiter,")
            .installationCommand(function (wizard) {
                /// Select the region and download the setup file
                var regions = ["EU West",
                               "Latin America North",
                               // "Latin America South", URL not found
                               "Oceania",
                               "Japan",
                               "Turkey",
                               "Brasil",
                               "EU Nordic & East",
                               "North America",
                               "Russia"];
                var selectedRegion = wizard.menu(tr("Select your region:"), regions);
                var baseUrl = "https://riotgamespatcher-a.akamaihd.net/releases/live/installer/deploy/League%20of%20Legends%20installer%20";
                switch (selectedRegion.text){
                    case "EU West":
                        regionID = "EUW";
                        url = baseUrl+"EUW.exe";
                        break;
                    case "Japan":
                        regionID = "JP";
                        url = baseUrl+"JP.exe";
                        break;
                    case "Turkey":
                        regionID = "TR";
                        url = baseUrl+"TR.exe";
                        break;
                    case "Brasil":
                        regionID = "BR";
                        url = baseUrl+"BR.exe";
                        break;
                    case "EU Nordic & East":
                        regionID = "EUNE";
                        url = baseUrl+"EUNE.exe";
                        break;
                    case "North America":
                        regionID = "NA";
                        url = baseUrl+"NA.exe";
                        break;
                    case "Russia":
                        regionID = "RU";
                        url = baseUrl+"RU.exe";
                        break;
                    case "Oceania":
                        regionID = "OCE1";
                        url = baseUrl+"OCE1.exe";
                        break;
                    case "Latin America North":
                        regionID = "LA1";
                        url = baseUrl+"LA1.exe";
                        break;
                }
                var setupFile = new Resource()
                    .wizard(wizard)
                    .url(url)
                    .name(fileName(url))
                    .get();

                return {command: setupFile};
            })
            .category("Games")
            .executable("League of Legends installer " + regionID + ".exe")
            .wineDistribution("staging")
            .wineVersion(LATEST_STAGING_VERSION)
            .preInstall(function (wine /*, wizard*/) {
                wine.d3dx9();
                wine.DXV9();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
