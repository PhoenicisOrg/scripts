---
title: "Tools"
category: General
order: 2
toc: true
---

Phoenicis uses several tools to ensure code quality and a uniform formatting in pull requests.

This pages describes these tools and how they can be run locally on your PC.

## ESLint
Checks Javascript files, e.g. formatting and JSDoc validity.
### Installation
```
sudo npm install -g eslint
```

### Execution
in the local git repository:
```
eslint -c .eslintrc.yml --fix ./**/*.js
```
## json-align
Formats JSON files.
### Installation
```
sudo npm install -g json-align
```

### Execution
in the local git repository:
```
find . -name "*.json" -print0 | xargs -0 json-align -i
```
