const Wine = include("engines.wine.engine.object");

const HDPI = include("engines.wine.plugins.hdpi");

/**
 * Setting to enable/disable Retina
 */
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
        const wine = new Wine().prefix(container);

        const currentValue = new HDPI(wine).isHdpi();

        return currentValue ? this.options[1] : this.options[0];
    }

    setOption(container, optionIndex) {
        const wine = new Wine().prefix(container);

        new HDPI(wine).withHdpi(1 == optionIndex).go();
    }
};
