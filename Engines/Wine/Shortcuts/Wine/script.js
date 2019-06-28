include("engines.wine.engine.object");

/**
* WineShortcut prototype
* @constructor
*/
function WineShortcut() {
    this._shortcutManager = Bean("shortcutManager");
    this._appsManager = Bean("repositoryManager");
    this._fileSearcher = Bean("fileSearcher");
    this._winePrefixesDirectory = Bean("propertyReader").getProperty("application.user.containers") + "/" + WINE_PREFIX_DIR + "/";

    this._category = "Other";
    this._description = "";
}

/**
* sets shortcut name
* @param {string} name shortcut name
* @returns {WineShortcut} WineShortcut object
*/
WineShortcut.prototype.name = function (name) {
    this._name = name;
    return this;
}

/**
* sets shortcut type
* @param {string} type shortcut type
* @returns {WineShortcut} WineShortcut object
*/
WineShortcut.prototype.type = function (type) {
    this._type = type;
    return this;
}

/**
* sets shortcut category
* @param {string} category shortcut category
* @returns {WineShortcut} WineShortcut object
*/
WineShortcut.prototype.category = function (category) {
    this._category = category;
    return this;
}

/**
* sets shortcut description
* @param {string} description shortcut description
* @returns {WineShortcut} WineShortcut object
*/
WineShortcut.prototype.description = function (description) {
    this._description = description;
    return this;
}

/**
* sets shortcut arguments
* @param {array} args shortcut arguments
* @returns {WineShortcut} WineShortcut object
*/
WineShortcut.prototype.arguments = function (args) {
    this._arguments = args;
    return this;
}

/**
* sets executable which shall be used
* @param {string} search executable name
* @returns {WineShortcut} WineShortcut object
*/
WineShortcut.prototype.search = function (search) {
    this._search = search;
    return this;
}

/**
* sets shortcut prefix
* @param {string} prefix shortcut prefix
* @returns {WineShortcut} WineShortcut object
*/
WineShortcut.prototype.prefix = function (prefix) {
    this._prefix = prefix;
    return this;
}

/**
* sets the miniature for the shortcut
* @param {string[]|URI} miniature
* array which specifies the application of which the miniature shall be used
* or
* URI of the miniature
* @returns {WineShortcut} WineShortcut object
*/
WineShortcut.prototype.miniature = function (miniature) {
    if (isArray(miniature)) {
        // application of miniature given
        var application = this._appsManager.getApplication(miniature);
        if (application != null && application.getMainMiniature().isPresent()) {
            this._miniature = application.getMainMiniature().get();
        }
    } else {
        // miniature URI given
        this._miniature = miniature;
    }

    return this;
}

/**
* sets shortcut environment
* @param {string} environment variables
* @returns {WineShortcut} WineShortcut object
*/
WineShortcut.prototype.environment = function (environment) {
    this._environment = environment;
    return this;
}

/**
* sets trust level
* @param {string} trustLevel trust level
* @returns {WineShortcut} WineShortcut object
*/
WineShortcut.prototype.trustLevel = function (trustLevel) {
    this._trustLevel = trustLevel;
    return this;
}


/**
* creates shortcut
* @returns {void}
*/
WineShortcut.prototype.create = function () {
    var _shortcutPrefixDirectory = this._winePrefixesDirectory + "/" + this._prefix;

    var executables = this._fileSearcher.search(_shortcutPrefixDirectory, this._search);

    if (executables.length == 0) {
        throw tr("Executable {0} not found!", this._search)
    }

    var ShortcutInfoDTOBuilderClass = Java.type('org.phoenicis.library.dto.ShortcutInfoDTO.Builder');
    var info = new ShortcutInfoDTOBuilderClass()
        .withCategory(this._category)
        .withName(this._name)
        .withDescription(this._description)
        .build();

    var myEnv = {WINEDEBUG: "-all"};
    if (typeof this._environment !== 'undefined') {
        var envJSON = JSON.parse(this._environment);
        Object.keys(envJSON).forEach(function (key){
            myEnv[key] = envJSON[key];
        });
    }

    var trustLevel;
    if (typeof this._trustLevel !== 'undefined') {
        trustLevel = this._trustLevel;
    }
    else {
        trustLevel = "0"; //dummy value
    }

    var ShortcutDTOBuilderClass = Java.type('org.phoenicis.library.dto.ShortcutDTO.Builder');
    var builder = new ShortcutDTOBuilderClass()
        .withId(this._name)
        .withInfo(info)
        .withScript(JSON.stringify({
            type: "WINE",
            environment: myEnv,
            trustLevel: trustLevel,
            winePrefix: this._prefix,
            arguments: this._arguments,
            workingDirectory:executables[0].getParentFile().getAbsolutePath(),
            executable: executables[0].getAbsolutePath()
        }));

    if (this._miniature) {
        builder.withMiniature(this._miniature);
    }

    this._shortcutManager.createShortcut(builder.build());
}
