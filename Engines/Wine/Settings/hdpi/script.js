const Wine = include("engines.wine.engine.object");

include("engines.wine.plugins.hdpi");

/**
 * Setting to enable/disable Retina
 */
// eslint-disable-next-line no-unused-vars
module.default = class HDPISetting {
    constructor() {
        this.options = [tr("Disabled"), tr("Enabled")];
    }

    getText() {
        return tr("Retina support");
    }

    getOptions() {
        return this.options;
    }

    getCurrentOption(container) {
        var currentValue = new Wine()
            .prefix(container)
            .hdpi();

        return currentValue ? this.options[1] : this.options[0];
    }

    setOption(container, optionIndex) {
        new Wine()
            .prefix(container)
            .hdpi(1 == optionIndex);
    }
}
