const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");
const Resource = include("utils.functions.net.resource");
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
        const codecs = new Resource()
            .wizard(wine.wizard())
            .url("http://rrubucket.s3.amazonaws.com/RockRaidersCodec_490085.zip")
            .checksum("efabe957e6d6dff015dfc4ceb04f00466a895782")
            .name("RockRaidersCodec_490085.zip")
            .get();
        new Extractor()
            .wizard(wine.wizard())
            .archive(codecs)
            .to(wine.prefixDirectory() + "/drive_c/RockRaidersCodec/")
            .extract(["-F", "iv5setup.exe"]);
        wizard.message(
            tr(
                "When installing Indeo codecs you must choose custom installation type. Then uncheck download DirectShow filter and Indeo 5 Netscape Browser Extension or else the installer will crash."
            )
        );
        wine.run(wine.prefixDirectory() + "/drive_c/RockRaidersCodec/iv5setup.exe");
        wine.wait();
    });
