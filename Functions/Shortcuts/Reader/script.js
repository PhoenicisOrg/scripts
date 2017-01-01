include(["Functions", "Engines", "Wine"]);

var _WineShortcutReader = function(shortcutContent) {
    this.shortcutContent = shortcutContent;

    this.run = function(userArguments) {
        var shortcutContent = JSON.parse(this.shortcutContent);

        if(!userArguments) {
            userArguments = [];
        }

        var arguments = (shortcutContent.arguments ? shortcutContent.arguments : []).concat(Java.from(userArguments));

        new Wine()
            .prefix(shortcutContent.winePrefix)
            .debug(shortcutContent.wineDebug)
            .workingDirectory(shortcutContent.workingDirectory)
            .run(shortcutContent.executable, arguments)
            .wait()
    };


    this.stop = function() {
        var shortcutContent = JSON.parse(this.shortcutContent);

        new Wine()
            .prefix(shortcutContent.winePrefix)
            .kill()
    }
};

var ShortcutReader = function() {
    var that = this;

    this.of = function(shortcutContent) {
        this.shortcutContent = shortcutContent;
        var shortcutContentParsed = JSON.parse(this.shortcutContent);

        if(shortcutContentParsed.type == "WINE") {
            that._runner = new _WineShortcutReader(this.shortcutContent);
        }
    };

    this.run = function(userArguments) {
        that._runner.run(userArguments);
    };

    this.stop = function() {
        that._runner.stop();
    };
};