include(["Engines", "Wine", "QuickScript", "SteamScript"]);
include(["Engines", "Wine", "Verbs", "vcrun2013"]);
include(["Engines", "Wine", "Verbs", "vcrun2008"]);
include(["Engines", "Wine", "Verbs", "xact"]);
include(["Engines", "Wine", "Verbs", "corefonts"]);

new SteamScript()
	.name("Subnautica")
	.editor("Unknown Worlds Entertainment")
	.author("Zemogiter")
	.applicationHomepage("https://unknownworlds.com/subnautica/")
	.wineDistribution("upstream")
	.wineVersion(3.1)
	.wineArchitecture("amd64")
	.appId(264710)
	.preInstall(function(wine, wizard) {
        	wine.vcrun2013();
        	wine.corefonts();
		wine.vcrun2008();
		wine.xact();
		var screenSize = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
		wine.setVirtualDesktop(screenSize.width, screenSize.height);
		Set objShell = WScript.CreateObject("UseTakeFocus")
		objShell.RegWrite "HKEY_CURRENT_USER\Software\Wine\X11 Driver", "N", "REG_SZ"
	})
	.gameOverlay(false)
	.executable("Steam.exe", ["-silent", "-applaunch", 264710, "-no-ces-sandbox", "-force-opengl"])
	.go();

