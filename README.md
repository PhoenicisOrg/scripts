# How to add a script
1. Select the right category
  * Development
  * Functions
  * Games
  * Graphics
  * Internet
  
2. Create a new folder for your script inside that category. The folder structure should be:
```
category
└── application-name
    ├── script-name
    │   ├── script.js
    │   └── script.json
    ├── miniatures
    │   └── main.png
    └── application.json
```

3. Fill the files:
  * [script.js](https://github.com/plata/Scripts/wiki/script.js): actual installation script
  * [script.json](https://github.com/plata/Scripts/wiki/script.json): describes the installation script
  ```json
  {
		"scriptName": "Online",
		"compatibleOperatingSystems": ["MACOSX", "LINUX"],
		"testingOperatingSystems": [],
		"free": true,
		"requiresNoCD": false
  }
  ```
  * main.png: application icon (400px x 300px)
  * [application.json](https://github.com/plata/Scripts/wiki/application.json): describes the application
  ```json
  {
		"name":	"Steam",
        "description": "Application description"
  }
  ```
