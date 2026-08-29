const { getLatestStableVersion } = include("engines.wine.engine.versions");
const WineShortcut = include("engines.wine.shortcuts.wine");

module.default = class QuickScript {
    constructor() {
        this._wineVersionFunction = getLatestStableVersion;
        this._wineArchitecture = "x86";
        this._wineDistribution = "upstream";
        this._wineUserSettings = false;

        this._type = "Applications";

        // by default do nothing in post install
        this._postInstall = function () { };
        this._preInstall = function () { };

        const appsManager = Bean("repositoryManager");
        const application = appsManager.getApplication([TYPE_ID, CATEGORY_ID, APPLICATION_ID]);

        this._miniature = java.util.Optional.empty();
        if (application) {
            this._miniature = application.getMainMiniature();

            // category icon
            const category = appsManager.getCategory([TYPE_ID, CATEGORY_ID]);
            if (category != null) {
                this._categoryIcon = category.getIcon();
            }
        }
    }

    name(name) {
        this._name = name;
        return this;
    }

    editor(editor) {
        this._editor = editor;
        return this;
    }

    applicationHomepage(applicationHomepage) {
        this._applicationHomepage = applicationHomepage;
        return this;
    }

    author(author) {
        this._author = author;
        return this;
    }

    type(type) {
        this._type = type;
        return this;
    }

    category(category) {
        this._category = category;
        return this;
    }

    /**
     * get/set miniature (for the installation and the shortcut)
     * @param {URI} [miniature] path to the miniature file
     * @returns {java.util.Optional} path to miniature (if used as getter), else QuickScript object
     */
    miniature(miniature) {
        // get
        if (arguments.length == 0) {
            return this._miniature;
        }

        // set
        this._miniature = java.util.Optional.of(miniature);
        return this;
    }

    /**
     * set executable
     * @param {string} executable executable without path (e.g. "Steam.exe")
     * @param {array} args use array (e.g. ["-applaunch", 409160])
     * @returns {QuickScript} QuickScript object
     */
    executable(executable, args) {
        this._executable = executable;
        this._executableArgs = typeof args !== 'undefined' ? args : "";
        return this;
    }

    wineArchitecture(wineArchitecture) {
        this._wineArchitecture = wineArchitecture;
        return this;
    }

    wineDistribution(wineDistribution) {
        this._wineDistribution = wineDistribution;
        return this;
    }

    wineVersion(wineVersion) {
        if (wineVersion && wineVersion instanceof Function) {
            this._wineVersionFunction = wineVersion;
        } else {
            this._wineVersionFunction = function () { return wineVersion; };
        }
        return this;
    }

    wineUserSettings(wineUserSettings) {
        // get
        if (arguments.length == 0) {
            return this._wineUserSettings;
        }

        // set
        this._wineUserSettings = wineUserSettings;
        return this;
    }

    postInstall(postInstall) {
        this._postInstall = postInstall;
        return this;
    }

    preInstall(preInstall) {
        this._preInstall = preInstall;
        return this;
    }

    /**
     * set environment
     * @param {string} environment variables
     * @returns {QuickScript} QuickScript object
     */
    environment(environmentFunc) {
        if (environmentFunc && environmentFunc instanceof Function) {
            this._environmentFunc= environmentFunc;
        } else {
            throw new Error(tr("The argument of environment() should be a function !"));
        }
        return this;
    }

    /**
     * set trust level
     * @param {string} trustLevel trust level
     * @returns {QuickScript} QuickScript object
     */
    trustLevel(trustLevel) {
        this._trustLevel = trustLevel;
        return this;
    }

    /**
     * determines which Wine version should be used
     * required in case the version is computed by a function
     * @param {wizard} wizard setup wizard (e.g. to show download progress of versions json)
     * @returns {void}
     */
    _determineWineVersion(wizard) {
        this._wineVersion = this._wineVersionFunction(wizard, this._wineArchitecture);
    }

    /**
     * creates shortcut
     * @param {string} [prefix] prefix name
     * @returns {void}
     */
    _createShortcut(prefix) {
        const shortcut = new WineShortcut()
            .name(this._name)
            .type(this._type)
            .category(this._category)
            .prefix(prefix)
            .search(this._executable)
            .environment(this._environment)
            .trustLevel(this._trustLevel)
            .arguments(this._executableArgs);

        if (this.miniature().isPresent()) {
            shortcut.miniature(this.miniature().get())
        }

        if (this._categoryIcon) {
            shortcut.categoryIcon(this._categoryIcon)
        }

        shortcut.create();
    }
}
