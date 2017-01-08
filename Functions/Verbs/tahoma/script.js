include(["Functions", "Engines", "Wine"]);
include(["Functions", "Net", "Resource"]);
include(["Functions", "Verbs", "luna"]);
include(["Functions", "Filesystem", "Files"]);

Wine.prototype.tahoma = function() {
    var tahoma = new Resource()
        .wizard(this._wizard)
        .url("https://github.com/caarlos0/msfonts/blob/master/fonts/tahoma.ttf")
        .checksum("6d41cf00c69183ebbfdd419fd5480eead7f2e2ed")
        .name("tahoma.ttf")
        .get();

    var tahomabd = new Resource()
        .wizard(this._wizard)
        .url("https://github.com/caarlos0/msfonts/blob/master/fonts/tahomabd.ttf")
        .checksum("e881bed4ad3d4b2591ec316ef9281ba81fef6610")
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
