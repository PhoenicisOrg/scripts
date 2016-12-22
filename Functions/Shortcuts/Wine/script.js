var WineShortcut = function () {
    var that = this;
    that._shortcutCreator = Bean("shortcutCreator");
    that._appsManager = Bean("appsManager");
    that._description = "";

    that.name = function (name) {
        that._name = name;
        return that;
    };
    that.description = function (description) {
        that._description = description;
        return that;
    };
    that.miniature = function(miniature) {
      if(isArray(miniature)) {
          var application = that._appsManager.getApplication(miniature);
          if(application != null && application.miniatures != null && application.miniatures[0] != null) {
              that._miniature = application.miniatures[0];
          }
      }

        return that;
    };
    that.create = function () {
        var builder = new com.phoenicis.library.dto.ShortcutDTO.Builder()
            .withName(that._name)
            .withDescription(that._description);

        if(that._miniature) {
            builder.withMiniature(that._miniature);
        }

        that._shortcutCreator.createShortcut(
            builder.build()
        );
    }
};