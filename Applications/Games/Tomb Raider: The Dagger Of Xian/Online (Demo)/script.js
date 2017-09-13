include(["Engines", "Wine", "QuickScript", "ZipScript"]);

new ZipScript()
    .name("Tomb Raider: The Dagger Of Xian (Demo)")
    .editor("Nicobass")
    .applicationHomepage("http://tombraider-dox.com/")
    .author("Plata")
    .url("http://dl.cdn.chip.de/downloads/71953335/TombRaiderDOX.zip?cid=&platform=chip&1504439392-1504446892-310ba5-B-bc9c7f2bac140a936b39c49ca10f99cc.zip")
    .checksum("f321a0db456227ba3f1e36bbead2b8564bfb26f5")
    .category("Games")
    .executable("TombRaiderDOX.exe")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .wineArchitecture("amd64")
    .go();
