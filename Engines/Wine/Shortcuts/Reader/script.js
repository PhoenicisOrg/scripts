include(["Engines", "Wine", "Engine", "Object"]);

var _WineShortcutReader = function(shortcut) {
    var that = this;
    that._shortcutManager = Bean("shortcutManager");
    that._libraryManager = Bean("libraryManager");
    that._uiQuestionFactory = Bean("uiQuestionFactory");
    that._winePrefixesDirectory = Bean("propertyReader").getProperty("application.user.containers") + "/" + WINE_PREFIX_DIR + "/";

    this.shortcut = shortcut;

    this.wineprefix = function() {
        var shortcutContent = JSON.parse(this.shortcut.script);
        return shortcutContent.winePrefix;
    };

    this.container = this.wineprefix;

    this.run = function(userArguments) {
        var shortcutContent = JSON.parse(this.shortcut.script);

        if(!userArguments) {
            userArguments = [];
        }

        var args = (shortcutContent.arguments ? shortcutContent.arguments : []).concat(Java.from(userArguments));

        new Wine()
            .prefix(shortcutContent.winePrefix)
            .debug(shortcutContent.wineDebug)
            .workingDirectory(shortcutContent.workingDirectory)
            .run(shortcutContent.executable, args)
    };


    this.stop = function() {
        var shortcutContent = JSON.parse(this.shortcut.script);

        new Wine()
            .prefix(shortcutContent.winePrefix)
            .kill()
    };

    this.uninstall = function() {
        var shortcutContent = JSON.parse(this.shortcut.script);
        var _winePrefix = shortcutContent.winePrefix;

        var _found = false;
        this._libraryManager.fetchShortcuts().forEach(function(shortcutCategory) {
            shortcutCategory.getShortcuts().forEach(function(shortcut) {
                var _otherShortcutContent = JSON.parse(shortcut.script);

                if(_otherShortcutContent.winePrefix == _winePrefix && shortcut.name != that.shortcut.name) {
                    _found = true;
                }
            });
        });

        this._shortcutManager.deleteShortcut(this.shortcut);

        if(!_found) {
            this._uiQuestionFactory.create(tr("The container {0} is no longer used.\nDo you want to delete it?", _winePrefix),
            function() {
                remove(that._winePrefixesDirectory + _winePrefix);
            });
        }
    }
};

/* exported ShortcutReader */
var ShortcutReader = function() {
    var that = this;

    this.of = function(shortcut) {
        this.shortcut = shortcut;
        var shortcutContentParsed = JSON.parse(this.shortcut.script);

        if(shortcutContentParsed.type == "WINE") {
            that._runner = new _WineShortcutReader(this.shortcut);
        }
    };

    this.run = function(userArguments) {
        that._runner.run(userArguments);
    };

    this.stop = function() {
        that._runner.stop();
    };

    this.uninstall = function() {
        that._runner.uninstall();
    };

    this.container = function() {
        return that._runner.container();
    };
};
