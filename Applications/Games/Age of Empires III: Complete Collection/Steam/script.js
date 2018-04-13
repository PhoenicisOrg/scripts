include(["engines", "wine", "quick_script", "steam_script"]);
include(["engines", "wine", "verbs", "mfc42"]);

var installerImplementation = {
    run: function () {
        new SteamScript()
            .name("Age of Empires® III: Complete Collection")
            .editor("Microsoft Studios")
            .author("Quentin PARIS")
            .appId(105450)
            .postInstall(function (wine/*, wizard*/) {
                wine.mfc42();
                wine.overrideDLL()
                    .set("native, builtin", ["pidgen"])
                    .do();
            })
            .go();
    }
};

/* exported Installer */
var Installer = Java.extend(org.phoenicis.scripts.Installer, installerImplementation);
