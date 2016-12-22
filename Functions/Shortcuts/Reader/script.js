include(["Functions", "Engines", "Wine"]);

var _WineShortcutReader = function(shortcutContent) {
    this.shortcutContent = shortcutContent;

    this.run = function() {
        var shortcutContent = JSON.parse(cat(filePath));

        new Wine()
            .prefix(shortcutContent.winePrefix)
            .workingDirectory(shortcutContent.workingDirectory)
            .run(shortcutContent.executable, shortcutContent.arguments)
    }
};

var ShortcutReader = function(shortcutContent) {
    this.shortcutContent = shortcutContent;
    this.run = function() {
        var shortcutContent = JSON.parse(this.shortcutContent);

        var runner;
        if(shortcutContent.type == "WINE") {
            runner = new _WineShortcutReader(filePath);
        }

        runner.run();
    }
};