# unity-package-installer
A lightweight utility for installing npm packages into a unity project.

## Background
This utility was inspired and informed by the work done by [shadowmint](https://github.com/shadowmint); many thanks to him for blazing the trail. This utility encapsulates the boilerplate of installing packages into a Unity3D project.

## Usage

Add `unity-package-installer` as a dependency to your `package.json` file. Information on the latest version can be found [here](https://www.npmjs.com/package/unity-package-installer).

```json
"dependencies": {
	"unity-package-installer": ">=0.2.0"
},
```

### Automatic installation of packages
To subscribe to automatic installation of your package into a unity project after `npm install`, add a `unity_package_installer` config.
```json
"config": {
	"unity_package_installer": {
		"source": "Source",
		"path": "Test Module"
	}
}
```
* source: A relative path to the folder to install in your unity project
* path: The name of the folder in unity to install to. The above example will result in a path of `Assets/Packages/Test Module`.

### Manual installation of packages
You may elect to control installing your package via a post install script of your own.

```json
"scripts": {
  "postinstall": "node scripts/postinstall.js"
},
```

```javascript
const PACKAGE_NAME = 'My Unity Package';

var installer = require('unity-package-installer');
var path = require('path');

// set the package source to ./../Files/My Unity Package/Source
var sourceFolder = path.join(__dirname, '..', 'Files', PACKAGE_NAME, 'Source');

// install the source into unity
installer.install(sourceFolder, PACKAGE_NAME);
```

Given the above, the contents of `sourceFolder` folder will be copied into `Assets/Packages/My Unity Package`.

You can also provide a callback to the installer if you want or need to perform additional actions after your files are copied into your project.

```javascript
function callback(err, dir) {
  // err - an error that occurred while trying to install your package
  // dir - the directory within your unity project where the files were just copied to
}
```

## Enhancements
I plan on using this utility with something I'm developing now, and already have a few improvements in mind. If you think of any, please feel free to [create an issue](https://github.com/ianwaldrop/unity-package-installer/issues)!

## Bug reports
Please, [file an issue](https://github.com/ianwaldrop/unity-package-installer/issues) if you notice anything not working as you think it should.
