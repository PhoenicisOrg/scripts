---
title: "Module System"
category: General
order: 1
toc: true
---

The scripts requires its scripts to be written as **modules**.
The idea behind modules is to specify which information inside a script should be made available to other scripts.
In addition the module systems helps making it apparent which information inside a script is taken from other scripts.

A module basically consists of two types of operations: **module includes** and **module exports**.

## Module Includes

A module include is required to use code defined in another module.
There are two types of module includes: the **default include** and the **named include**.

### Default Include

Whenever an included module should be used as a single object, like a `class` object, it should be included using a **default include**.
A default include assigns an included module to a variable:

```javascript
const Module = include("module.id");

// do something with module
```

The assigned variable will contain the value that has been assigned to the **default export** of the included module.

### Named Include

In other cases a single module exports multiple values, which can be used independently from each other.
In such situations the different values can be included using a **named include**.
A named include allows the selection of only a subset of the exported values to be included:

```javascript
const { foo, bar, x, y } = include("module.id");

// do something with foo, bar, x and y
```

The included values can be any kind of object like functions, classes or constants.

## Module Exports

To allow other modules to include values from another module, the module needs to first export it.
An export statement specifies as a form of contract that a value should be _exported_ to other modules and therefore be used by the other modules.
Values are exported by assigning them to the `module` variable which is made available when executing the module script.
A module can contain two types export statements: a single **default export** or multiple **named exports**.

### Named Exports

In some cases a module will need to export multiple values.
In such situations **named exports** can be used.
A named export assigns each exported value to its own variable of the `module` variable:

```javascript
module.foo = function() {
    ...
};

module.bar = function(input) {
    ...
};

module.x = // exported value
module.y = // other exported value
```

The previous example module exports four values: `foo`, `bar`, `x` and `y`, which can be included using the code shown in the **Named Include** section.

### Default Export

Often a module will only export a single value.
In such situations a **default export** can be used to make the value accessible by other modules.
A single value can be exported by using:

```javascript
module.default = // value to export
```

The single exported default value needs to be assigned to the `default` value of the `module` variable.
This defines the value as the default export of the module.

A module can either use a single default export **or** multiple named exports.
When a module uses both export types the default export is applied.
