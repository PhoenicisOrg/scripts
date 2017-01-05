function QuickScript() {
    this._wineVersion = LATEST_STABLE_VERSION;
    this._wineArchitecture = "x86";

    // by default do nothing in post install
    this._postInstall = function() {};
    this._preInstall = function() {};
}

QuickScript.prototype.name = function(name) {
    this._name = name;
    return this;
};

QuickScript.prototype.editor = function(editor) {
    this._editor = editor;
    return this;
};

QuickScript.prototype.applicationHomepage = function(applicationHomepage) {
    this._applicationHomepage = applicationHomepage;
    return this;
};

QuickScript.prototype.author = function(author) {
    this._author = author;
    return this;
};

QuickScript.prototype.category = function(category) {
    this._category = category;
    return this;
};

/**
 * set executable
 * @param executable executable without path (e.g. "Steam.exe")
 * @param arguments use array (e.g. ["-applaunch", 409160])
 */
QuickScript.prototype.executable = function(executable, arguments) {
    this._executable = executable;
    this._executableArgs = typeof arguments !== 'undefined' ? arguments : "";
    return this;
};

QuickScript.prototype.wineArchitecture = function(wineArchitecture) {
    this._wineArchitecture = wineArchitecture;
    return this;
};

QuickScript.prototype.wineVersion = function(wineVersion) {
    this._wineVersion = wineVersion;
    return this;
};

QuickScript.prototype.postInstall = function(postInstall) {
    this._postInstall = postInstall;
    return this;
};

QuickScript.prototype.preInstall = function(preInstall) {
    this._preInstall = preInstall;
    return this;
};
