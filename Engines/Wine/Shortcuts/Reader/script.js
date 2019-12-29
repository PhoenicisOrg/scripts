const Wine = include("engines.wine.engine.object");
const { WINE_PREFIX_DIR } = include("engines.wine.engine.constants");
const { remove } = include("utils.functions.filesystem.files");

class WineShortcutReader {
    constructor(shortcut) {
        this.shortcut = shortcut;

        this.shortcutManager = Bean("shortcutManager");
        this.libraryManager = Bean("libraryManager");
        this.uiQuestionFactory = Bean("uiQuestionFactory");
        this.winePrefixesDirectory =
            Bean("propertyReader").getProperty("application.user.containers") + "/" + WINE_PREFIX_DIR + "/";

        this.shortcutContent = JSON.parse(this.shortcut.script);
    }

    get container() {
        return this.shortcutContent.winePrefix;
    }

    run(userArguments) {
        if (!userArguments) {
            userArguments = [];
        }

        let shortcutArguments = this.shortcutContent.arguments;
        if (!shortcutArguments) {
            shortcutArguments = [];
        }

        const args = shortcutArguments.concat(Java.from(userArguments));

        const userData = {
            environment: this.shortcutContent.environment,
            trustLevel: this.shortcutContent.trustLevel
        };

        new Wine()
            .prefix(this.container)
            .run(this.shortcutContent.executable, args, this.shortcutContent.workingDirectory, false, false, userData);
    }

    stop() {
        new Wine().prefix(this.shortcutContent.winePrefix).kill();
    }

    uninstall() {
        const found = Java.from(this.libraryManager.fetchShortcuts())
            .flatMap(shortcutCategory => shortcutCategory.getShortcuts())
            .some(shortcut => {
                const otherShortcutContent = JSON.parse(shortcut.script);

                return otherShortcutContent.winePrefix == this.container && shortcut.name != this.shortcut.name;
            });

        this.shortcutManager.deleteShortcut(this.shortcut);

        if (!found) {
            this.uiQuestionFactory.create(
                tr("The container {0} is no longer used.\nDo you want to delete it?", this.container),
                () => remove(this.winePrefixesDirectory + this.container)
            );
        }
    }
}

module.default = class ShortcutReader {
    constructor() {
        // do nothing
    }

    /**
     * Sets shortcut
     *
     * @param {string} shortcut shortcut
     * @returns {void}
     */
    of(shortcut) {
        const shortcutContentParsed = JSON.parse(shortcut.script);

        switch (shortcutContentParsed.type) {
            case "WINE":
                this.runner = new WineShortcutReader(shortcut);
                break;
            default:
                throw new Error(`Unknown container type ${shortcutContentParsed.type}`);
        }
    }

    /**
     * Returns the name of the container belonging to a shortcut
     *
     * @returns {string} The container name
     */
    getContainer() {
        return this.runner.container;
    }

    /**
     * Runs a shortcut with the given user arguments
     *
     * @param {array} userArguments The user arguments
     * @returns {void}
     */
    run(userArguments) {
        this.runner.run(userArguments);
    }

    /**
     * Stops the running shortcut
     *
     * @returns {void}
     */
    stop() {
        this.runner.stop();
    }

    /**
     * Uninstalls the shortcut
     *
     * @returns {void}
     */
    uninstall() {
        this.runner.uninstall();
    }
}
