---
title: "Classes"
category: General
order: 4
toc: true
---

Most components inside the scripts are implemented as JavaScript prototype classes. 
To allow an easier understanding of the code and to be more inline with the Phoenicis application implementation classes should be implemented using the new [`ECMAScript 2015`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) syntax. 


### Structure
A class defined with this newer syntax has the following structure:

```javascript
class ClassName extends ParentClassName {
    constructor(<arguments>) {
        super(<super-arguments>);

        // object initialization
    }

    foo(<arguments>) {
        // method body

        return <result>;
    }

    bar() {
        // method body
    }
}
```

Where:
- `ClassName` is the unique name of the class
- `ParentClassName` is the name of the parent class (this is optional)
- `constructor(...)` is the constructor method of the class, which is called whenever an object of the class is instantiated via the `new` keyword
- `super(...)` calls the constructor method of the parent class 
- `foo(...)` and `bar(...)` are prototype function definitions

### Example
```javascript
class ShortcutReader {
    constructor() {
        // do nothing
    }

    /**
     * sets shortcut
     * @param {string} shortcut shortcut
     * @returns {void}
     */
    of(shortcut) {
        const shortcutContentParsed = JSON.parse(shortcut.script);

        if (shortcutContentParsed.type == "WINE") {
            this.runner = new WineShortcutReader(shortcut);
        }
    }

    /**
     * returns container of shortcut
     * @returns {string} container
     */
    get container() {
        return this.runner.container();
    }

    /**
     * runs shortcut
     * @param {array} userArguments arguments
     * @returns {void}
     */
    run(userArguments) {
        this.runner.run(userArguments);
    }

    /**
     * stops running shortcut
     * @returns {void}
     */
    stop() {
        this.runner.stop();
    }

    /**
     * uninstalls shortcut
     * @returns {void}
     */
    uninstall() {
        this.runner.uninstall();
    }
}
```

