const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");
const {writeToFile} = include("utils.functions.filesystem.files");
const {getLatestStagingVersion} = include("engines.wine.engine.versions");

const D3DX9 = include("engines.wine.verbs.d3dx9");

new OnlineInstallerScript()
    .name("STAR WARS™: The Old Republic")
    .editor("BioWare")
    .applicationHomepage("http://www.swtor.com/")
    .author("ImperatorS79")
    .wineVersion(getLatestStagingVersion)
    .wineDistribution("staging") //minimum version to run it, see https://dev.wine-staging.com/patches/164/
    .url("https://swtor-a.akamaihd.net/installer/SWTOR_setup.exe")
    .checksum("c538935eff4ec90ce2e48dc7e515a8dec2f15f58")
    .category("Games")
    .executable("launcher.exe")
    .preInstall((wine /*, wizard*/) => {
        //it seems it brings better performance
        new D3DX9(wine).go();
    })
    .postInstall((wine /*, wizard*/) => {
        //without that the launcher is unable to download the game
        var path =
			wine.prefixDirectory() +
			"drive_c/" +
			wine.programFiles() +
			"/Electronic Arts/BioWare/Star Wars - The Old Republic/launcher.settings";
        var content =
			'{ "Login": ""\n' +
			', "LastProduct": ""\n' +
			', "downloadRate": "0"\n' +
			', "language": ""\n' +
			', "TestServerAccess": "No"\n' +
			', "SpecHash": ""\n' +
			', "AutoClose": "NONE"\n' +
			', "KillKillProc": false\n' +
			', "LastMode": ""\n' +
			', "PatchingMode": "{ \\"swtor\\": \\"SSN\\" }"\n' +
			', "bitraider_download_complete": { }\n' +
			', "log_levels": "INFO,SSNFO,ERROR"\n' +
			', "bitraider_disable": true\n' +
			', "loglevels": "INFO,SSNFO,ERROR"\n' +
			"}";
        writeToFile(path, content);
    });
