const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const VirtualDesktop = include("engines.wine.plugins.virtual_desktop");
const DotNET40 = include("engines.wine.verbs.dotnet40");

new LocalInstallerScript()
    .name("MyHarmony")
    .editor("Logitech")
    .applicationHomepage("https://www.myharmony.com")
    .author("Plata")
    .category("Multimedia")
    .executable("MyHarmonyLauncher.exe")
    .preInstall((wine) => {
        new DotNET40(wine).go();
    })
    .postInstall((wine) => {
        // fix missing mouse cursor
        new VirtualDesktop(wine).go();
    });
