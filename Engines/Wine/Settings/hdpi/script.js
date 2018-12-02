include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "hdpi"]);

/**
 * setting to enable/disable GLSL
*/
var settingImplementation = {
    _options: [tr("Disabled"), tr("Enabled")],

    getText: function () {
        return tr("Retina support");
    },
    getOptions: function () {
        return this._options;
    },
    getCurrentOption: function (container) {
        var currentValue = new Wine()
            .prefix(container)
            .hdpi();

        return currentValue ? this._options[1] : this._options[0];
    },
    setOption: function (container, optionIndex) {
        new Wine()
            .prefix(container)
            .hdpi(1 == optionIndex);
    }
};

/* exported Setting */
var Setting = Java.extend(org.phoenicis.engines.EngineSetting, settingImplementation);
