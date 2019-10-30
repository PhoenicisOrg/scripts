/**
 * Plugin to run "regsvr32"
 */
module.default = class Regsvr32 {
    constructor(wine) {
        this.wine = wine;
        this.dlls = [];
    }

    withDll(dll) {
        this.dlls.push(dll);

        return this;
    }

    go() {
        this.dlls.forEach(dll => this.wine.run("regsvr32", ["/i", dll], this.wine.prefixDirectory(), false, true));
    }
};
