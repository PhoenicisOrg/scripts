const OnlineInstallerScript = include("engines.wine.quick_script.online_installer_script");

const Vcrun2012 = include("engines.wine.verbs.vcrun2012");
const D3DX9 = include("engines.wine.verbs.d3dx9");

new OnlineInstallerScript()
    .name("DC Universe Online")
    .editor("Sony Entertainment")
    .applicationHomepage("http://www.dcuniverseonline.com/")
    .author("Zemoscripter")
    .url("https://launch.daybreakgames.com/installer/DCUO_setup.exe")
    .category("Games")
    .executable("LaunchPad.exe")
    .preInstall(function (wine /*, wizard*/) {
        new Vcrun2012(wine).go();
        new D3DX9(wine).go();
    });
