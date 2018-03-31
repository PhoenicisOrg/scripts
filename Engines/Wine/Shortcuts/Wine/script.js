include(["Engines", "Wine", "Engine", "Object"]);

/* exported WineShortcut */
var WineShortcut = function () {
    var that = this;
    that._shortcutManager = Bean("shortcutManager");
    that._appsManager = Bean("repositoryManager");
    that._fileSearcher = Bean("fileSearcher");
    that._winePrefixesDirectory = Bean("propertyReader").getProperty("application.user.containers") + "/" + WINE_PREFIX_DIR + "/";

    that._category = "Other";
    that._description = "";

    that.name = function (name) {
        that._name = name;
        return that;
    };

    that.type = function (type) {
        that._type = type;
        return that;
    };

    that.category = function (category) {
        that._category = category;
        return that;
    };

    that.description = function (description) {
        that._description = description;
        return that;
    };

    that.arguments = function(args) {
        that._arguments = args;
        return that;
    };

    that.search = function(search) {
        that._search = search;
        return that;
    };

    that.prefix = function(prefix) {
        that._prefix = prefix;
        return that;
    };

    /**
    * sets the miniature for the shortcut
    * @param {string[]|URI} miniature
    * array which specifies the application of which the miniature shall be used
    * or
    * URI of the miniature
    * @returns {WineShortcut}
    */
    that.miniature = function(miniature) {
        if(isArray(miniature)) {
            // application of miniature given
            var application = that._appsManager.getApplication(miniature);
            if(application != null && application.getMainMiniature().isPresent()) {
                that._miniature = application.getMainMiniature().get();
            }
        } else {
            // miniature URI given
            that._miniature = miniature;
        }

        return that;
    };

    that.create = function () {
        var _shortcutPrefixDirectory = that._winePrefixesDirectory + "/" + that._prefix;

        var executables = that._fileSearcher.search(_shortcutPrefixDirectory, that._search);

        if (executables.length == 0) {
            throw tr("Executable {0} not found!", that._search)
        }

        var info = new org.phoenicis.library.dto.ShortcutInfoDTO.Builder()
            .withCategory(that._category)
            .withName(that._name)
            .withDescription(that._description)
            .build();

        var builder = new org.phoenicis.library.dto.ShortcutDTO.Builder()
            .withId(that._name)
            .withInfo(info)
            .withScript(JSON.stringify({
                type: "WINE",
                wineDebug: "-all",
                winePrefix: that._prefix,
                arguments: that._arguments,
                workingDirectory:executables[0].getParentFile().getAbsolutePath(),
                executable: executables[0].getAbsolutePath()
            }));

        if(that._miniature) {
            builder.withMiniature(that._miniature);
        }

        that._shortcutManager.createShortcut(
            builder.build()
        );
    }
};
