var WineShortcut = function () {
    var that = this;
    that._shortcutCreator = Bean("shortcutCreator");
    that._description = "";

    that.name = function (name) {
        that._name = name;
        return that;
    };
    that.description = function (description) {
        that._description = description;
        return that;
    };
    that.create = function () {
        that._shortcutCreator.createShortcut(
            new com.phoenicis.library.dto.ShortcutDTO.Builder()
                .withName(that._name)
                .withDescription(that._description)
                .build()
        );
    }
};