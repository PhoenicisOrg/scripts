const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const Downloader = include("utils.functions.net.download");
const { Extractor } = include("utils.functions.filesystem.extract");

const Amstream = include("engines.wine.verbs.amstream");
const Quartz = include("engines.wine.verbs.quartz");
const Devenum = include("engines.wine.verbs.devenum");
const D3drm = include("engines.wine.verbs.d3drm");

new LocalInstallerScript()
    .name("Lego Rock Raiders")
    .editor("LEGO Media")
    .author("Zemogiter")
    .category("Games")
    .executable("LegoRR.exe")
    .wineVersion("3.0.3")
    .wineDistribution("upstream")
    .preInstall((wine, wizard) => {
        new Amstream(wine).go();
        new Quartz(wine).go();
        new Devenum(wine).go();
        new D3drm(wine).go();

        wizard.message(tr("When the game ask to install DirectX Media click yes. Click no when it ask for DirectX 6."));
    })
    .postInstall((wine, wizard) => {
        wizard.message(
            tr(
                "This game needs a copy protection patch to work. It may be illegal in your country to patch copy protection. You must patch the game yourself."
            )
        );
        const zipLocation = wine.prefixDirectory() + "drive_c/RockRaidersCodec_490085.zip";
        new Downloader()
            .wizard(wizard)
            .url("http://rrubucket.s3.amazonaws.com/RockRaidersCodec_490085.zip")
            .checksum("991a343dc608c6a1914127a55f2e5b47")
            .algorithm("MD5")
            .to(zipLocation)
            .get();
        new Extractor()
            .wizard(wizard)
            .archive(wine.prefixDirectory() + "/drive_c/RockRaidersCodec_490085.zip")
            .to(wine.prefixDirectory() + "/drive_c/RockRaidersCodec/")
            .extract(["-F", "iv5setup.exe"]);
        wizard.message(
            tr(
                "When installing Indeo codecs you must choose custom installation type. Then uncheck ownload DirectShow filter and Indeo 5 Netscape Browser Extension or else the installer will crash."
            )
        );
        wine.run(wine.prefixDirectory() + "/drive_c/RockRaidersCodec/iv5setup.exe");
        wine.wait();
    });
