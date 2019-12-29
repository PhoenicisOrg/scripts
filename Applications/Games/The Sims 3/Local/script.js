const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");

const Vcrun2010 = include("engines.wine.verbs.vcrun2010");
const Tahoma = include("engines.wine.verbs.tahoma");
const Mfc42 = include("engines.wine.verbs.mfc42");
const DotNET20 = include("engines.wine.verbs.dotnet20");

new LocalInstallerScript()
    .name("The Sims 3")
    .editor("Electronic Arts")
    .applicationHomepage("http://www.thesims3.com/")
    .author("Zemogiter")
    .category("Games")
    .executable("Sims3Launcher.exe", ["xgamma -gamma 1"])
    .preInstall((wine) => {
        new Mfc42(wine).go();
        new Tahoma(wine).go();
        new Vcrun2010(wine).go();
        new DotNET20(wine).go();
    });
