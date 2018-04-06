include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Net", "Resource"]);
include(["Engines", "Wine", "Verbs", "luna"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

Wine.prototype.tahoma = function() {
    var tahoma = new Resource()
        .wizard(this._wizard)
        .url("https://github.com/caarlos0/msfonts/blob/master/fonts/tahoma.ttf?raw=true")
        .checksum("ae34f679d7f384123ff10453bbeaca649d4987b1")
        .name("tahoma.ttf")
        .get();

    var tahomabd = new Resource()
        .wizard(this._wizard)
        .url("https://github.com/caarlos0/msfonts/blob/master/fonts/tahomabd.ttf?raw=true")
        .checksum("07e766641293bfd570ed85bce75abc9be2da0ee1")
        .name("tahomabd.ttf")
        .get();

    cp(tahoma, this.fontDirectory());
    cp(tahomabd, this.fontDirectory());

    this.registerFont()
        .set("Tahoma", "tahoma.ttf")
        .set("Tahoma Bold", "tahomabd.ttf")
        .do();
    return this;
};
