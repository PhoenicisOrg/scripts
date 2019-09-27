const PlainInstaller = include("utils.functions.apps.plain_installer");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const Wine = include("engines.wine.engine.object");
const { LATEST_STABLE_VERSION } = include("engines.wine.engine.versions");
const { remove } = include("utils.functions.filesystem.files");
const WineShortcut = include("engines.wine.shortcuts.wine");
const AppResource = include("utils.functions.apps.resources");

const OverrideDLL = include("engines.wine.plugins.override_dll");
include("engines.wine.plugins.regedit");
include("engines.wine.plugins.regsvr32");
include("engines.wine.plugins.windows_version");
const Msls31 = include("engines.wine.verbs.msls31");

new PlainInstaller().withScript(() => {
    var appsManager = Bean("repositoryManager");
    var application = appsManager.getApplication([TYPE_ID, CATEGORY_ID, APPLICATION_ID]);
    var setupWizard = SetupWizard(InstallationType.APPS, "Internet Explorer 6.0", application.getMainMiniature());

    setupWizard.presentation("Internet Explorer 6.0", "Microsoft", "http://www.microsoft.com", "Quentin PÂRIS");

    var setupFile = new Resource()
        .wizard(setupWizard)
        .url("http://files.playonlinux.com/ie/6.0/ie60.exe")
        .checksum("8e483db28ff01a7cabd39147ab6c59753ea1f533")
        .name("ie60.exe")
        .get();

    var wine = new Wine()
        .wizard(setupWizard)
        .prefix("InternetExplorer6", "upstream", "x86", LATEST_STABLE_VERSION)
        .create();

    new Msls31(wine).go();

    wine.windowsVersion("win2k");

    remove(wine.prefixDirectory() + "/drive_c/IE 6.0 Full/");
    remove(wine.prefixDirectory() + "/drive_c/" + wine.programFiles() + "/Internet Explorer/iexplore.exe");

    [
        "itircl",
        "itss",
        "jscript",
        "mlang",
        "mshtml",
        "msimtf",
        "shdoclc",
        "shdocvw",
        "shlwapi",
        "urlmon",
        "browseui",
        "iseng",
        "inetcpl"
    ].forEach(function (dll) {
        remove(wine.prefixDirectory() + "/drive_c/windows/system32/" + dll + ".dll");
    });

    wine.run(setupFile, [], null, false, true);

    new CabExtract()
        .wizard(setupWizard)
        .archive(wine.prefixDirectory() + "/drive_c/IE 6.0 Full/ACTSETUP.CAB")
        .to(wine.prefixDirectory() + "/drive_c/windows/system32/")
        .extract(["-F", "inseng.dll"]);

    wine.run("iexplore", ["-unregserver"], null, false, true);

    new OverrideDLL(wine).withMode("native", ["inseng"]).go();

    wine.runInsidePrefix("IE 6.0 Full/IE6SETUP.EXE", [], true);

    new OverrideDLL(wine)
        .withMode("native,builtin", [
            "inetcpl.cpl",
            "itircl",
            "itss",
            "jscript",
            "mlang",
            "mshtml",
            "msimtf",
            "shdoclc",
            "shdocvw",
            "shlwapi",
            "urlmon"
        ])
        .go();

    var librariesToRegister = [
        "actxprxy.dll",
        "browseui.dll",
        "browsewm.dll",
        "cdfview.dll",
        "ddraw.dll",
        "dispex.dll",
        "dsound.dll",
        "iedkcs32.dll",
        "iepeers.dll",
        "iesetup.dll",
        "imgutil.dll",
        "inetcomm.dll",
        "inetcpl.cpl",
        "inseng.dll",
        "isetup.dll",
        "jscript.dll",
        "laprxy.dll",
        "mlang.dll",
        "mshtml.dll",
        "mshtmled.dll",
        "msi.dll",
        "msident.dll",
        "msoeacct.dll",
        "msrating.dll",
        "mstime.dll",
        "msxml3.dll",
        "occache.dll",
        "ole32.dll",
        "oleaut32.dll",
        "olepro32.dll",
        "pngfilt.dll",
        "quartz.dll",
        "rpcrt4.dll",
        "rsabase.dll",
        "rsaenh.dll",
        "scrobj.dll",
        "scrrun.dll",
        "shdocvw.dll",
        "shell32.dll",
        "urlmon.dll",
        "vbscript.dll",
        "webcheck.dll",
        "wshcon.dll",
        "wshext.dll",
        "asctrls.ocx",
        "hhctrl.ocx",
        "mscomct2.ocx",
        "plugin.ocx",
        "proctexe.ocx",
        "tdc.ocx",
        "webcheck.dll",
        "wshom.ocx"
    ];

    var progressBar = setupWizard.progressBar(tr("Please wait..."));
    var i = 1;
    librariesToRegister.forEach(function (dll) {
        progressBar.setProgressPercentage((i * 100) / librariesToRegister.length);
        progressBar.setText(tr("Installing {0}...", dll));
        wine.regsvr32().install(dll);
        i++;
    });

    remove(wine.prefixDirectory() + "/drive_c/windows/system32/iexplore.exe");

    new WineShortcut()
        .name("Internet Explorer 6.0")
        .prefix("InternetExplorer6")
        .search("iexplore.exe")
        .miniature([TYPE_ID, CATEGORY_ID, APPLICATION_ID])
        .create();

    var registrySettings = new AppResource().application([TYPE_ID, CATEGORY_ID, APPLICATION_ID]).get("ie6.reg");
    wine.regedit().patch(registrySettings);

    setupWizard.close();
});
