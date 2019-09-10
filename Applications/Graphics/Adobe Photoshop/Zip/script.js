const ZipScript = include("engines.wine.quick_script.zip_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");
include("engines.wine.plugins.font_smoothing");
include("engines.wine.verbs.corefonts");
include("engines.wine.verbs.gdiplus");
include("engines.wine.verbs.vcrun2015");
include("engines.wine.verbs.msxml3");
include("engines.wine.verbs.msxml6");
include("engines.wine.verbs.atmlib");
include("engines.wine.verbs.adobeair");


new ZipScript()
    .name("Adobe Photoshop")
    .editor("Adobe Inc.")
    .applicationHomepage("https://www.adobe.com/")
    .author("Jacob Hrbek")
    .category("Graphics")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .setupPathInsidePrefix("Adobe Photoshop/Set-up.exe")
    .url("http://prdl-download.adobe.com/Photoshop/55E8FC8663C847F08BFBCD8DFE336AE8/1546595903133/AdobePhotoshop20-mul_x64.zip")
    .preInstall(function (wine /*, wizard*/) {
        wine.corefonts();
        wine.gdiplus();
        wine.vcrun2015();
        wine.atmlib();
        wine.msxml3();
        wine.msxml6();
        wine.adobeair();
        wine.fontSmoothing("RGB");
    });
