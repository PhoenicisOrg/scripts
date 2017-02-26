include(["Functions", "Verbs", "sp3extract"]);

Wine.prototype.crypt32 = function() {
    this.sp3extract("crypt32.dll");
    this.sp3extract("msasn1.dll");

    this.overrideDLL()
        .set("native, builtin", ["crypt32"])
        .do()
};
