include("engines.wine.engine.object");

class WineShortcutReader {
    constructor(shortcut) {
        this.shortcut = shortcut;

        this.shortcutManager = Bean("shortcutManager");
        this.libraryManager = Bean("libraryManager");
        this.uiQuestionFactory = Bean("uiQuestionFactory");
        this.winePrefixesDirectory = Bean("propertyReader").getProperty("application.user.containers") + "/" + WINE_PREFIX_DIR + "/";
    }

    get wineprefix() {
        const shortcutContent = JSON.parse(this.shortcut.script);

        return shortcutContent.winePrefix;
    }

    run(userArguments) {
        const shortcutContent = JSON.parse(this.shortcut.script);

        if (!userArguments) {
            userArguments = [];
        }

        const args = (shortcutContent.arguments ? shortcutContent.arguments : []).concat(Java.from(userArguments));

        const userData = {
            wineDebug: shortcutContent.wineDebug
        };

        new Wine()
            .prefix(shortcutContent.winePrefix)
            .run(shortcutContent.executable, args, shortcutContent.workingDirectory, false, false, userData)
    }


    stop() {
        const shortcutContent = JSON.parse(this.shortcut.script);

        new Wine()
            .prefix(shortcutContent.winePrefix)
            .kill()
    }

    uninstall() {
        const shortcutContent = JSON.parse(this.shortcut.script);

        const winePrefix = shortcutContent.winePrefix;

        let found = false;
        this.libraryManager.fetchShortcuts().forEach(function (shortcutCategory) {
            shortcutCategory.getShortcuts().forEach(function (shortcut) {
                const otherShortcutContent = JSON.parse(shortcut.script);

                if (otherShortcutContent.winePrefix == winePrefix && shortcut.name != that.shortcut.name) {
                    found = true;
                }
            });
        });

        this.shortcutManager.deleteShortcut(this.shortcut);

        if (!found) {
            this.uiQuestionFactory.create(tr("The container {0} is no longer used.\nDo you want to delete it?", winePrefix),
                function () {
                    remove(that.winePrefixesDirectory + winePrefix);
                });
        }
    }
}

class ShortcutReader {
    constructor() {
        // do nothing
    }

    /**
     * sets shortcut
     * @param {string} shortcut shortcut
     * @returns {void}
     */
    of(shortcut) {
        const shortcutContentParsed = JSON.parse(shortcut.script);

        if (shortcutContentParsed.type == "WINE") {
            this.runner = new WineShortcutReader(shortcut);
        }
    }

    /**
     * returns container of shortcut
     * @returns {string} container
     */
    get container() {
        return this.runner.container();
    }

    /**
     * runs shortcut
     * @param {array} userArguments arguments
     * @returns {void}
     */
    run(userArguments) {
        this.runner.run(userArguments);
    }

    /**
     * stops running shortcut
     * @returns {void}
     */
    stop() {
        this.runner.stop();
    }

    /**
     * uninstalls shortcut
     * @returns {void}
     */
    uninstall() {
        this.runner.uninstall();
    }
}
