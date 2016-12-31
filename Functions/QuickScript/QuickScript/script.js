function QuickScript() {
};

QuickScript.prototype.name = function(name) {
    this._name = name;
    return this;
};

QuickScript.prototype.editor = function(editor) {
    this._editor = editor;
    return this;
};

QuickScript.prototype.editorUrl = function(editorUrl) {
    this._editorUrl = editorUrl;
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

QuickScript.prototype.executable = function(executable, arguments = "") {
    this._executable = executable;
    this._executableArgs = arguments;
    return this;
};
