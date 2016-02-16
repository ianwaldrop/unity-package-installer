# unity-package-installer
A lightweight utility for installing npm packages into a unity project.

## Background
This utility was inspired and informed by the work done by [shadowmint](https://github.com/shadowmint); many thanks to him for blazing the trail. This utility encapsulates the boilerplate of installing packages into a Unity3D project.

## Usage

Add `unity-package-installer` as a dependency to your `package.json` file. Information on the latest version can be found [here](https://www.npmjs.com/package/unity-package-installer).

```json
"dependencies": {
	"unity-package-installer": ">=0.1.1"
},
```

To use it, simply tell the installer where the source is and what the folder inside Unity should be called.

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

## Auto installation of your package
If you would like your package to be automatically installed after issuing the `npm install {{package}}` command, be sure to include a postInstall script.

### Tell npm which script to run

Npm will run scripts for you at certain times, like after installing a package. You just have to tell it which script to run.

```json
"scripts": {
  "postinstall": "node scripts/postinstall.js"
},
```

In this case `postinstall.js` looks exactly like the above example, but you might want to do more with it.

## Enhancements
I plan on using this utility with something I'm developing now, and already have a few improvements in mind. If you think of any, please feel free to [create an issue](https://github.com/ianwaldrop/unity-package-installer/issues)!

## Bug reports
Please, [file an issue](https://github.com/ianwaldrop/unity-package-installer/issues) if you notice anything not working as you think it should.
