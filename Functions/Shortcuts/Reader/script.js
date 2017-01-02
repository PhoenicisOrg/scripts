include(["Functions", "Engines", "Wine"]);

var _WineShortcutReader = function(shortcut) {
    var that = this;
    that._shortcutManager = Bean("shortcutManager");
    that._libraryManager = Bean("libraryManager");
    that._uiQuestionFactory = Bean("uiQuestionFactory");
    that._winePrefixesDirectory = Bean("propertyReader").getProperty("application.user.wineprefix");

    this.shortcut = shortcut;

    this.run = function(userArguments) {
        var shortcutContent = JSON.parse(this.shortcut.script);

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
        var shortcutContent = JSON.parse(this.shortcut.script);

        new Wine()
            .prefix(shortcutContent.winePrefix)
            .kill()
    };

    this.uninstall = function() {
        var shortcutContent = JSON.parse(this.shortcut.script);
        var _winePrefix = shortcutContent.winePrefix;

        var _found = false;
        this._libraryManager.fetchShortcuts().forEach(function(shortcut) {
            var _otherShortcutContent = JSON.parse(shortcut.script);

            if(_otherShortcutContent.winePrefix == _winePrefix && shortcut.name != that.shortcut.name) {
                _found = true;
            }
        });

        this._shortcutManager.deleteShortcut(this.shortcut);

        if(!_found) {
            this._uiQuestionFactory.create("The container " + winePrefix + " is no longer used. Do you want to delete it?",
            function() {
                remove(that._winePrefixesDirectory + _winePrefix);
            });
        }
    }
};

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
    }
};