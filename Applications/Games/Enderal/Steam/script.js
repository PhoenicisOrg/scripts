const SteamScript = include("engines.wine.quick_script.steam_script");
const Downloader = include("utils.functions.net.download");

new SteamScript()
    .name("Enderal")
    .editor("SureAI")
    .author("Plata")
    .appId(72850) // Skyrim appId
    .applicationHomepage("http://sureai.net/games/enderal/")
    .postInstall((wine, wizard) => {
        // the SteamScript has installed Skyrim, now install Enderal
        var launcher =
			wine.prefixDirectory() + "drive_c/" + wine.programFiles() + "/Steam/steamapps/common/Skyrim/Enderal Launcher.exe";
        new Downloader()
            .wizard(wizard)
            .url(
                "http://dl.cdn.chip.de/downloads/47961527/Enderal_Launcher_1.1.3.5.exe?cid=96271624&platform=chip&1483552833-1483560333-d5f465-B-f7881cd02886aa9b20d7587d408c40c5.exe"
            )
            .checksum("7aefb75f933764f9de394ba40d712775961ba137")
            .to(launcher)
            .get();

        // TODO: query language (you can download the files for EN or DE)
        new Downloader()
            .wizard(wizard)
            .url(
                "http://www.moddb.com/downloads/mirror/108797/114/c4f0b73f726afaac087c0f786851fb5f/?referer=http%3A%2F%2Fenderal.com%2F"
            )
            .checksum("94f6504b4480c8209bc049571374da2f")
            .to(
                wine.prefixDirectory() +
					"drive_c/" +
					wine.programFiles() +
					"/Steam/steamapps/common/Skyrim/EnderalInstall_EN.gz"
            )
            .get();
    })
    .executable("Enderal Launcher.exe");
