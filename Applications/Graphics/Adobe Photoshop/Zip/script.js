const ZipScript = include("engines.wine.quick_script.zip_script");
const {LATEST_STAGING_VERSION} = include("engines.wine.engine.versions");
const FontSmoothing = include("engines.wine.plugins.font_smoothing");
const Corefonts = include("engines.wine.verbs.corefonts");
const GDIPlus = include("engines.wine.verbs.gdiplus");
const Vcrun2015 = include("engines.wine.verbs.vcrun2015");
const Msxml3 = include("engines.wine.verbs.msxml3");
const Msxml6 = include("engines.wine.verbs.msxml6");
const Atmlib = include("engines.wine.verbs.atmlib");
const AdobeAir = include("engines.wine.verbs.adobeair");


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
    .preInstall(function (wine) {
        new Corefonts(wine).go();
        new GDIPlus(wine).go();
        new Vcrun2015(wine).go();
        new Atmlib(wine).go();
        new Msxml3(wine).go();
        new Msxml6(wine).go();
        new AdobeAir(wine).go();
        new FontSmoothing(wine).withMode("RGB").go();
    });
