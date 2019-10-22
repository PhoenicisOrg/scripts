---
title: "Best practices"
category: General
order: 5
toc: false
---

This page describes best practices for writing your scripts.

When writing your own script you'll need to test it. To test a script Phoenicis doesn't only require the script, but also some context information. For example a miniature image used in the library after the script has been installed. Some other context information is extracted by Phoenicis via the directory structure, the script is located in.

Therefore to test a script it needs to be embedded inside a repository. For this a local repository, which is based on the official script repository, is recommended. To setup your own local repository proceed the following steps:

1. Fork the official scripts repository
2. Create a new branch for your script on your fork
3. Clone your fork to your local scripts repository (usually `~/.Phoenicis/repository/`)
4. Checkout your branch
5. Follow the [how to](https://github.com/PhoenicisOrg/scripts/blob/master/README.md)
6. Commit your changes and create a pull request to have your script merged in the official script repository

Before testing your local script it is recommended to first refresh your Phoenicis application, to ensure that it uses the most current version of your script. There are two ways to refresh Phoenicis:

1. Restart Phoenicis. After restarting it will automatically reload your repositories and their contained scripts
2. Click on `Settings -> Repositories -> Refresh Repositories`, this will lead to Phoenicis reloading the repositories

## Unfinished scripts
If your script is unfinished/not fully tested but you still want to share it (e.g. because you need help), create a pull request and label it "help wanted". People can then help you with comments or by submitting pull requests for the branch on your fork.
