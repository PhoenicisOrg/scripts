var WineShortcut = function() {
    var that = this;
    var shortcutCreator = Bean("shortcutCreator");

    that.description = "";

    return {
        "name": function(name) {
            that.name = name;
            return this;
        },
        "description": function(description) {
            that.name = description;
            return this;
        },
        "create": function() {
            shortcutCreator.createShortcut(
                new com.phoenicis.library.dto.ShortcutDTO.Builder()
                    .withName(that.name)
                    .withDescription(that.description)
                    .build()
            );
        }
    }
};