const PlainInstaller = include("utils.functions.apps.plain_installer");

const Resource = include("utils.functions.net.resource");
const Wine = include("engines.wine.engine.object");
const { getLatestStableVersion } = include("engines.wine.engine.versions");
const { remove } = include("utils.functions.filesystem.files");
const WineShortcut = include("engines.wine.shortcuts.wine");

const Sandbox = include("engines.wine.verbs.sandbox");

const OverrideDLL = include("engines.wine.plugins.override_dll");
const Regsvr32 = include("engines.wine.plugins.regsvr32");
const WindowsVersion = include("engines.wine.plugins.windows_version");

new PlainInstaller().withScript(() => {
    var appsManager = Bean("repositoryManager");
    var application = appsManager.getApplication([TYPE_ID, CATEGORY_ID, APPLICATION_ID]);
    var setupWizard = SetupWizard(InstallationType.APPS, "Internet Explorer 7.0", application.getMainMiniature());

    setupWizard.presentation("Internet Explorer 7.0", "Microsoft", "http://www.microsoft.com", "Quentin PÂRIS");

    var wine = new Wine()
        .wizard(setupWizard)
        .prefix("InternetExplorer7", "upstream", "x86", getLatestStableVersion(setupWizard, "x86"))
        .create();

    new Sandbox(wine).go();

    wine.run("iexplore", ["-unregserver"], null, false, true);

    new OverrideDLL(wine)
        .withMode("native,builtin", [
            "itircl",
            "itss",
            "jscript",
            "mshtml",
            "msimtf",
            "shdoclc",
            "shdocvw",
            "shlwapi",
            "urlmon",
            "xmllite"
        ])
        .withMode("native", ["iexplore.exe"])
        .withMode("builtin", ["updspapi"])
        .go();

    // delete existing IE, otherwise installer will abort with "newer IE installed"
    remove(wine.prefixDirectory() + "/drive_c/" + wine.programFiles() + "/Internet Explorer/iexplore.exe");
    ["itircl", "itss", "jscript", "mlang", "mshtml", "msimtf", "shdoclc", "shdocvw", "shlwapi", "urlmon"].forEach(
        (dll) => {
            remove(wine.prefixDirectory() + "/drive_c/windows/system32/" + dll + ".dll");
        }
    );

    var languages = [
        "Arabic",
        "Chinese (Simplified)",
        "Chinese (Traditional, Taiwan)",
        "Czech",
        "Danish",
        "Dutch",
        "English",
        "Finnish",
        "French",
        "German",
        "Greek",
        "Hebrew",
        "Hungarian",
        "Italian",
        "Japanese",
        "Korean",
        "Norwegian",
        "Polish",
        "Portuguese (Brazil)",
        "Portuguese (Portugal)",
        "Russian",
        "Spanish",
        "Swedish",
        "Turkish"
    ];
    var selectedLanguage = setupWizard.menu(tr("Which language version would you like to install?"), languages);
    var setupLanguage = languages[selectedLanguage.index];

    var ie7link, ie7installer, ie7md5;

    switch (setupLanguage) {
        case "English":
            ie7link =
                "http://download.microsoft.com/download/3/8/8/38889dc1-848c-4bf2-8335-86c573ad86d9/IE7-WindowsXP-x86-enu.exe";
            ie7installer = "IE7-WindowsXP-x86-enu.exe";
            ie7md5 = "ea16789f6fc1d2523f704e8f9afbe906";
            break;
        case "French":
            ie7link =
                "http://download.microsoft.com/download/d/7/6/d7635233-5433-45aa-981b-4690ae90b785/IE7-WindowsXP-x86-fra.exe";
            ie7installer = "IE7-WindowsXP-x86-fra.exe";
            ie7md5 = "77c9bdd28f220f2c31fc23d73125eef7";
            break;
        case "German":
            ie7link =
                "http://download.microsoft.com/download/6/b/c/6bcfcbcd-d634-44f9-8231-c4b05323770a/IE7-WindowsXP-x86-deu.exe";
            ie7installer = "IE7-WindowsXP-x86-deu.exe";
            ie7md5 = "b704d4f7956af137294e72c30799cabe";
            break;
        case "Arabic":
            ie7link =
                "http://download.microsoft.com/download/f/5/e/f5ec8dec-a76d-4866-88a3-8bd6be368c8d/IE7-WindowsXP-x86-ara.exe";
            ie7installer = "IE7-WindowsXP-x86-ara.exe";
            ie7md5 = "d6788008595b2e241b0616b4d84652b1";
            break;
        case "Chinese (Simplified)":
            ie7link =
                "http://download.microsoft.com/download/4/1/8/418981a4-6ef9-4de6-befc-1a53e886cb62/IE7-WindowsXP-x86-chs.exe";
            ie7installer = "IE7-WindowsXP-x86-chs.exe";
            ie7md5 = "9bbf568537e6ff060954bc710b5e648e";
            break;
        case "Chinese (Traditional, Taiwan)":
            ie7link =
                "http://download.microsoft.com/download/4/a/5/4a5a86de-af85-432e-979c-fa69e5d781db/IE7-WindowsXP-x86-cht.exe";
            ie7installer = "IE7-WindowsXP-x86-cht.exe";
            ie7md5 = "193bf89a4556eca1ac244bedbe7ab5aa";
            break;
        case "Czech":
            ie7link =
                "http://download.microsoft.com/download/6/c/9/6c933e30-c659-438e-9bc0-6e050e329d14/IE7-WindowsXP-x86-csy.exe";
            ie7installer = "IE7-WindowsXP-x86-csy.exe";
            ie7md5 = "88859df39f3048a742756eb629483c02";
            break;
        case "Danish":
            ie7link =
                "http://download.microsoft.com/download/9/f/b/9fbfc1cb-47ea-4364-9829-830e5c5b8b09/IE7-WindowsXP-x86-dan.exe";
            ie7installer = "IE7-WindowsXP-x86-dan.exe";
            ie7md5 = "1d752313b9bcfc088392a204bd00a130";
            break;
        case "Dutch":
            ie7link =
                "http://download.microsoft.com/download/4/3/3/433d9e80-2b31-4bf3-844f-c11eece20da5/IE7-WindowsXP-x86-nld.exe";
            ie7installer = "IE7-WindowsXP-x86-nld.exe";
            ie7md5 = "752244327d5fb2bb9d3f4636a3ce10c7";
            break;
        case "Finnish":
            ie7link =
                "http://download.microsoft.com/download/3/9/6/396ee8cb-0f76-47ab-86b1-3c2ad0752bc3/IE7-WindowsXP-x86-fin.exe";
            ie7installer = "IE7-WindowsXP-x86-fin.exe";
            ie7md5 = "bc67ebaf7bf69763bcc7a6109360527d";
            break;
        case "Greek":
            ie7link =
                "http://download.microsoft.com/download/f/3/f/f3fc00ed-8b5d-4e36-81f0-fe0d722993e2/IE7-WindowsXP-x86-ell.exe";
            ie7installer = "IE7-WindowsXP-x86-ell.exe";
            ie7md5 = "9974e80af2c470581cb3c58332cd9f0a";
            break;
        case "Hebrew":
            ie7link =
                "http://download.microsoft.com/download/5/8/7/587bbf05-6132-4a49-a81d-765082ce8246/IE7-WindowsXP-x86-heb.exe";
            ie7installer = "IE7-WindowsXP-x86-heb.exe";
            ie7md5 = "19eb048477c1cb70e0b68405d2569d22";
            break;
        case "Hungarian":
            ie7link =
                "http://download.microsoft.com/download/7/2/c/72c09e25-5635-43f9-9f62-56a8f87c58a5/IE7-WindowsXP-x86-hun.exe";
            ie7installer = "IE7-WindowsXP-x86-hun.exe";
            ie7md5 = "ae8e824392642166d52d33a5dab55c5d";
            break;
        case "Italian":
            ie7link =
                "http://download.microsoft.com/download/3/9/0/3907f96d-1bbd-499a-b6bd-5d69789ddb54/IE7-WindowsXP-x86-ita.exe";
            ie7installer = "IE7-WindowsXP-x86-ita.exe";
            ie7md5 = "510a2083dfb4e42209d845968861a2df";
            break;
        case "Japanese":
            ie7link =
                "http://download.microsoft.com/download/d/4/8/d488b16c-877d-474d-912f-bb88e358055d/IE7-WindowsXP-x86-jpn.exe";
            ie7installer = "IE7-WindowsXP-x86-jpn.exe";
            ie7md5 = "13934f80870d549493197b5cb0995112";
            break;
        case "Korean":
            ie7link =
                "http://download.microsoft.com/download/1/0/a/10ad8b7f-2354-420d-aae3-ddcff81554fb/IE7-WindowsXP-x86-kor.exe";
            ie7installer = "IE7-WindowsXP-x86-kor.exe";
            ie7md5 = "3cc8e93f191f726e5ec9b23349a261c0";
            break;
        case "Norwegian":
            ie7link =
                "http://download.microsoft.com/download/a/a/3/aa317f65-e818-458c-a36f-9f0feb017744/IE7-WindowsXP-x86-nor.exe";
            ie7installer = "IE7-WindowsXP-x86-nor.exe";
            ie7md5 = "7450388c1dd004f63b39ade2868da9bd";
            break;
        case "Polish":
            ie7link =
                "http://download.microsoft.com/download/6/a/0/6a01b4fa-66e5-4447-8f36-9330a8725ecd/IE7-WindowsXP-x86-plk.exe";
            ie7installer = "IE7-WindowsXP-x86-plk.exe";
            ie7md5 = "09677cc0df807cd9fb0a834eeecbfec9";
            break;
        case "Portuguese (Brazil)":
            ie7link =
                "http://download.microsoft.com/download/e/9/8/e98bd8ac-3122-4079-bb70-d19b5d5ef875/IE7-WindowsXP-x86-ptb.exe";
            ie7installer = "IE7-WindowsXP-x86-ptb.exe";
            ie7md5 = "ec5098a90641f4c3c248582ed8d7cf8c";
            break;
        case "Portuguese (Portugal)":
            ie7link =
                "http://download.microsoft.com/download/9/9/0/99012553-0eea-402d-99e9-bdc2f4ee26a9/IE7-WindowsXP-x86-ptg.exe";
            ie7installer = "IE7-WindowsXP-x86-ptg.exe";
            ie7md5 = "5882c9721261d564220e4f776a811197";
            break;
        case "Russian":
            ie7link =
                "http://download.microsoft.com/download/d/4/e/d4e2d315-2493-44a4-8135-b5310b4a50a4/IE7-WindowsXP-x86-rus.exe";
            ie7installer = "IE7-WindowsXP-x86-rus.exe";
            ie7md5 = "db8d6f76a16a690458c65b831bfe14a4";
            break;
        case "Spanish":
            ie7link =
                "http://download.microsoft.com/download/4/c/4/4c4fc47b-974c-4dc9-b189-2820f68b4535/IE7-WindowsXP-x86-esn.exe";
            ie7installer = "IE7-WindowsXP-x86-esn.exe";
            ie7md5 = "0b90933978f8f39589b4bd6e457d8899";
            break;
        case "Swedish":
            ie7link =
                "http://download.microsoft.com/download/1/2/3/12311242-faa8-4edf-a0c4-86bf4e029a54/IE7-WindowsXP-x86-sve.exe";
            ie7installer = "IE7-WindowsXP-x86-sve.exe";
            ie7md5 = "7a569708bd72ab99289064008609bfa8";
            break;
        case "Turkish":
            ie7link =
                "http://download.microsoft.com/download/4/e/7/4e77d531-5c33-4f9b-a5c9-ea29fb79cc56/IE7-WindowsXP-x86-trk.exe";
            ie7installer = "IE7-WindowsXP-x86-trk.exe";
            ie7md5 = "71a39c77bcfd1e2299e99cb7433e5856";
            break;
    }

    var setupFile = new Resource()
        .wizard(setupWizard)
        .url(ie7link)
        .checksum(ie7md5)
        .algorithm("MD5")
        .name(ie7installer)
        .get();

    new WindowsVersion(wine).withWindowsVersion("winxp", "sp3").go();

    wine.wait();

    wine.run(setupFile, [], null, false, true);

    wine.wait();

    var librairiesToRegister = [
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

    var progressBar = setupWizard.progressBar("Please wait...");
    var i = 1;
    librairiesToRegister.forEach(dll => {
        progressBar.setProgressPercentage((i * 100) / librairiesToRegister.length);
        progressBar.setText(tr("Installing {0}...", dll));

        new Regsvr32(wine).withDll(dll).go();

        i++;
    });

    remove(wine.prefixDirectory() + "/drive_c/windows/system32/iexplore.exe");

    new WineShortcut()
        .name("Internet Explorer 7.0")
        .prefix("InternetExplorer7")
        .search("iexplore.exe")
        .miniature(["applications", "internet", "internet_explorer_7_0"])
        .create();

    setupWizard.close();
});
