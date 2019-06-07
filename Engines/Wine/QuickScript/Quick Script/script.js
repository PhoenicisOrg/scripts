include("engines.wine.shortcuts.wine");

function QuickScript() {
    this._wineVersion = LATEST_STABLE_VERSION;
    this._wineArchitecture = "x86";
    this._wineDistribution = "upstream";

    this._type = "Applications";

    // by default do nothing in post install
    this._postInstall = function () {};
    this._preInstall = function () {};
    this._wineUserSettings = false;

    var appsManager = Bean("repositoryManager");
    var application = appsManager.getApplication([TYPE_ID, CATEGORY_ID, APPLICATION_ID]);
    this._miniature = java.util.Optional.empty();
    if (application) {
        this._miniature = application.getMainMiniature();
    }
}

QuickScript.prototype.name = function (name) {
    this._name = name;
    return this;
};

QuickScript.prototype.editor = function (editor) {
    this._editor = editor;
    return this;
};

QuickScript.prototype.applicationHomepage = function (applicationHomepage) {
    this._applicationHomepage = applicationHomepage;
    return this;
};

QuickScript.prototype.author = function (author) {
    this._author = author;
    return this;
};

QuickScript.prototype.type = function (type) {
    this._type = type;
    return this;
};

QuickScript.prototype.category = function (category) {
    this._category = category;
    return this;
};

/**
 * get/set miniature (for the installation and the shortcut)
 * @param {URI} [miniature] path to the miniature file
 */
QuickScript.prototype.miniature = function (miniature) {
    // get
    if (arguments.length == 0) {
        return this._miniature;
    }

    // set
    this._miniature = java.util.Optional.of(miniature);
    return this;
};

/**
 * set executable
 * @param executable executable without path (e.g. "Steam.exe")
 * @param args use array (e.g. ["-applaunch", 409160])
 */
QuickScript.prototype.executable = function (executable, args) {
    this._executable = executable;
    this._executableArgs = typeof args !== 'undefined' ? args : "";
    return this;
};

/**
 * set environment
 * @param {string} environment variables
 * @returns {QuickScript} QuickScript object
 */
QuickScript.prototype.environment = function (environment) {
    this._environment = environment;
    return this;
}

/**
 * set trust level
 * @param {string} trust level
 * @returns {QuickScript} QuickScript object
 */
QuickScript.prototype.trustLevel = function (trustLevel) {
    this._trustLevel = trustLevel;
    return this;
}


QuickScript.prototype.wineArchitecture = function (wineArchitecture) {
    this._wineArchitecture = wineArchitecture;
    return this;
};

QuickScript.prototype.wineDistribution = function (wineDistribution) {
    this._wineDistribution = wineDistribution;
    return this;
};

QuickScript.prototype.wineVersion = function (wineVersion) {
    this._wineVersion = wineVersion;
    return this;
};

QuickScript.prototype.wineUserSettings = function (wineUserSettings) {
    // get
    if (arguments.length == 0) {
        return this._wineUserSettings;
    }

    // set
    this._wineUserSettings = wineUserSettings;
    return this;
};

QuickScript.prototype.postInstall = function (postInstall) {
    this._postInstall = postInstall;
    return this;
};

QuickScript.prototype.preInstall = function (preInstall) {
    this._preInstall = preInstall;
    return this;
};

/**
 * creates shortcut
 * @param {string} [prefix] prefix name
 */
QuickScript.prototype._createShortcut = function (prefix) {
    var shortcut = new WineShortcut()
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
    shortcut.create();
};
