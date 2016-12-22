var WineShortcut = {
        _shortcutCreator: Bean("shortcutCreator"),
        name: function(name) {
            this._name = name;
            return this;
        },
        description: function(description) {
            this._name = description;
            return this;
        },
        create: function() {
            this._shortcutCreator.createShortcut(
                new com.phoenicis.library.dto.ShortcutDTO.Builder()
                    .withName(this._name)
                    .withDescription(this_description)
                    .build()
            );
        }
};