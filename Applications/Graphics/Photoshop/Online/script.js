include("engines.wine.quick_script.online_installer_script");
include("engines.wine.plugins.font_smoothing");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.gdiplus");
include("engines.wine.verbs.vcrun2015");
include("engines.wine.verbs.msxml3");
include("engines.wine.verbs.msxml6");
include("engines.wine.verbs.atmlib");
include("engines.wine.verbs.adobeair");
include("utils.functions.net.download");
include("utils.functions.filesystem.extract");
include("utils.functions.filesystem.files");


new OnlineInstallerScript()
    .name("Photoshop")
    .editor("Adobe Inc.")
    .applicationHomepage("https://www.adobe.com/")
    .author("Jacob Hrbek")
    .category("Graphics")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .preInstall(function (wine, wizard){
        wine.corefonts();
        wine.gdiplus();
        wine.vcrun2015();
        wine.atmlib();
        wine.msxml3();
        wine.msxml6();
        wine.atmlib();
        wine.adobeair();
        wine.font_smoothing("RGB");

        var zipLocation = wine.prefixDirectory() + "/drive_c/AdobePhotoshop20-mul_x64.zip";
        new Downloader()
            .wizard(wizard)
            .url("http://prdl-download.adobe.com/Photoshop/55E8FC8663C847F08BFBCD8DFE336AE8/1546595903133/AdobePhotoshop20-mul_x64.zip")
            .to(zipLocation)
            .get();
    })
    .postInstall(function (wine, wizard){
        new Extractor()
            .wizard(wizard)
            .archive(wine.prefixDirectory() + "/drive_c/AdobePhotoshop20-mul_x64.zip")
            .to(wine.prefixDirectory() + "/drive_c/photoshopcc2019/")
            .extract(["-F", "Set-up.exe"]);
        wine.run(wine.prefixDirectory() + "/drive_c/photoshopcc2019/Set-up.exe");
        wine.wait();
    });
