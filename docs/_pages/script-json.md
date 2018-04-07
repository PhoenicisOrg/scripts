---
title: "script.json"
permalink: /script-json/
toc: false
---

This file describes the script.

```json
{
	"scriptName": "name of the script",
	"id": "script_id",
	"compatibleOperatingSystems": ["MACOSX", "LINUX"],
	"testingOperatingSystems": [],
	"free": true,
	"requiresPatch": false
}
```

## scriptName
Name of the script. Typical values are:
* Steam: script installs a game from Steam
* Online: script downloads the application from the Internet

## id
ID of the script. Requirements:
* all lower case
* only a-z, 0-9, _

## compatibleOperatingSystems
Operating systems which the script is known to work with. Can be:
* MACOSX
* LINUX

## testingOperatingSystems
Operating systems for which the script is in beta. Should be set if you are unsure that the script will run properly for everybody (like if it requires a huge amount of hack, or if it is not compatible with a any graphics cards, etc...). Takes the same values as `compatibleOperatingSystems`.

Must be a subset of `compatibleOperatingSystems`, i.e. 
* compatible does not contain "LINUX": app is not compatible with Linux at all
* compatible contains "LINUX" and testing does not contain "LINUX": app is fully compatible with Linux
* compatible contains "LINUX" and testing contains "LINUX": app is compatible with Linux, but beta

## free
The application can be downloaded for free (free as in beer).

## requiresPatch
Application cannot work without patching the original protection. It may be illegal to install it depending on your country.
