include(["Engines", "Wine", "Verbs", "sp3extract"]);

/**
* Verb to install crypt32
* @returns {Wine} Wine object
*/
Wine.prototype.crypt32 = function() {
    this.sp3extract("crypt32.dll");
    this.sp3extract("msasn1.dll");

    this.overrideDLL()
        .set("native, builtin", ["crypt32"])
        .do()
};
