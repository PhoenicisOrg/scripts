include("engines.wine.quick_script.online_installer_script");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.gdiplus");
include("engines.wine.verbs.vcrun2015");
//include("engines.wine.verbs.msxml3"); - Not available
//include("engines.wine.verbs.msxml6"); - Not available
include("engines.wine.verbs.amtlib");
//include("engines.wine.verbs.FontsSmoothRGB"); - Not available
include("engines.wine.verbs.adobeair");
//include("engines.wine.verbs.amtlib"); - Not available
include("utils.functions.net.download");
include("utils.functions.filesystem.extract");
include("utils.functions.filesystem.files");

// Based on https://appdb.winehq.org/objectManager.php?sClass=version&iId=37541
// Abadoned due missing functions

var installerImplementation = {
    run: function () {
        new OnlineInstallerScript()
            .name("Photoshop")
            .editor("Adobe Inc.")
            .applicationHomepage("https://www.adobe.com/")
            .author("Jacob Hrbek")
            .category("Graphics")
            .wineVersion("LATEST_STAGING_VERSION")
            .wineDistribution("staging")

            .preInstall(function (wine, wizard){
               wine.corefonts();
               wine.gdiplus();
               wine.vcrun2015();
               wine.amtlib();
               //FIXME: wine.msxml3();
               //FIXME: wine.msxml6();
               //FIXME: wine.amtlib();
               wine.adobeair();

                var zipLocation = wine.prefixDirectory() + "drive_c/AdobePhotoshop20-mul_x64.zip";
                new Downloader()
                    .wizard(wizard)
                    .url("http://prdl-download.adobe.com/Photoshop/55E8FC8663C847F08BFBCD8DFE336AE8/1546595903133/AdobePhotoshop20-mul_x64.zip")
                    // .checksum("null") - Not available https://www.virustotal.com/#/url/f127c94f2f2420dc43d127d4ed7f42d45141c71badfe82ed4d2305807b0fc38e/detection
                    //.algorithm("MD5")
                    .to(zipLocation)
                    .get();
            })

            .postInstall(function (wine, wizard){
                new Extractor()
                    .wizard(wizard)
                    .archive(wine.prefixDirectory() + "drive_c/AdobePhotoshop20-mul_x64.zip")
                    .to(wine.prefixDirectory() + "/drive_c/photoshopcc2019/")
                    .extract(["-F", "Set-up.exe"]);
                wine.run(wine.prefixDirectory() + "/drive_c/photoshopcc2019/Set-up.exe");
                wine.wait();
              })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
