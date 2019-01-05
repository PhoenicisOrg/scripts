include(["engines", "wine", "quick_script", "custom_installer_script"]);
include(["engines", "wine", "plugins", "csmt"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["engines", "wine", "plugins", "windows_version"]);
include(["engines", "wine", "shortcuts", "wine"]);
include(["engines", "wine", "verbs", "sandbox"]);
include(["engines", "wine", "verbs", "d3dx9"]);

// Installs League of Legends

var installerImplementation = {
    run: function () {
        new CustomInstallerScript()
            .name("League of Legends")
            .editor("Riot Games")
            .applicationHomepage("http://leagueoflegends.com/")
            .author("Plata, feanor12, Thog, kreyren")
            .installationCommand(function (wizard) {
                // Select the region and download the setup file
                ////////////////////////////////////////////////
                var regions = ["EU West",
                               "Latin America North",
                               "Latin America South",
                               "Oceania",
                               "Japan",
                               "Turkey",
                               "Brasil",
                               "EU Nordic & East",
                               "North America",
                               "Russia"];
                var selectedRegion = wizard.menu(tr("Select your region:"), regions);
                var regionID, url, sha1;
                var baseUrl = "https://riotgamespatcher-a.akamaihd.net/releases/live/installer/deploy/League%20of%20Legends%20installer%20";
                switch (selectedRegion.text){
                    case "EU West":
                        regionID = "EUW";
                        url = baseUrl+"EUW.exe";
                        sha1 = "9c5507d6416d32e7442597c74a92e63a19fbb60b";
                        break;
                    case "Japan":
                        regionID = "JP";
                        url = baseUrl+"JP.exe";
                        sha1 = "9476c1441841c761c0025cbd24ae3ee02728ad98";
                        break;
                    case "Turkey":
                        regionID = "TR";
                        url = baseUrl+"TR.exe";
                        sha1 = "a70c755f7425753b31f4f703d9d324c7bf419636";
                        break;
                    case "Brasil":
                        regionID = "BR";
                        url = baseUrl+"BR.exe";
                        sha1 = "f8dbe7b5fcb0b635cebdedffed1de90818a7f797";
                        break;
                    case "EU Nordic & East":
                        regionID = "EUNE";
                        url = baseUrl+"EUNE.exe";
                        sha1 = "689bcb1e0a04e9beda64ce42b50c1d73f22cbe75";
                        break;
                    case "North America":
                        regionID = "NA";
                        url = baseUrl+"NA.exe";
                        sha1 = "947be3aad794fdb865971afe1db36b6aa114b4c7";
                        break;
                    case "Russia":
                        regionID = "RU";
                        url = baseUrl+"RU.exe";
                        sha1 = "ff2803494f9a62b7faea303fd1894b660c6360ea";
                        break;
                    case "Oceania":
                        regionID = "OCE1";
                        url = baseUrl+"OCE1.exe";
                        sha1 = "0a8d29e8a71de4638a797a563fcc689a969930f0";
                        break;
                    case "Latin America North":
                        regionID = "LA1";
                        url = baseUrl+"LA1.exe";
                        sha1 = "73208f6e3c9e46faf2294958bf3dde0f3df95b36";
                        break;
                }
                var setupFile = new Resource()
                    .wizard(wizard)
                    .url(url)
                    .checksum(sha1)
                    .name(fileName(url))
                    .get();

                return {command: setupFile, args: ["--installdir", "C:\\LoL\\", "--mode", "unattended"]};
            })
            .category("Games")
            .wineDistribution("staging")
            .wineVersion(LATEST_STAGING_VERSION) // TODO: Gallium9 patchset
            .preInstall(function (wine /*, wizard*/) {
                wine.windowsVersion("winxp");
                wine.d3dx9();
                // wine.overrideDLL().set("native, builtin", ["atl120", "msvcp120", "msvcr120", "vcomp120", "msvcp140"]).do(); // Obsolete?
                wine.enableCSMT();
                wine.disableGLSL(); // Needs approval + recommended by WineHQ
                wine.corefonts(); // Needs approval + mandatory for fonts
                wine.vcrun2008(); // Needs approval
                wine.vcrun2017(); // Needs approval
                wine.adobeair(); // Needs approval + mandatory for launcher

                mkdir(wine.prefixDirectory() + "drive_c/LoL");

                // Create run script to start the right exe
                /////////////////////////////////////////
                var client = wine.prefixDirectory() + "drive_c/LoL/run.bat";
                var batContent = "start C:\\LoL\\LeagueClient.exe";
                writeToFile(client, batContent);
            })
            .executable("run.bat")
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
