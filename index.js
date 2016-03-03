var findParent, mkdirp, dive, path, ncp, colors;

// we do this try catch in order to work around the fact that
// some packages aren't able to be found when processing
// postinstall for the root package.
try {
  findParent = require('find-parent-dir');
  mkdirp = require('mkdirp');
  colors = require('colors');
  dive = require('dive');
  path = require('path');
  ncp = require('ncp');
}
catch (err) {
  // console.error('> ' + err + '. If this occurs on the root package, then it can be safely ignored.\n');
  process.exit(0);
}

function handleError(err, callback) {
	if (callback) {
		callback(err)
	}
	else {
		console.error(err)
		process.exit(1)
	}
}

// TODO externalize this
const RULES = {
  folders: {
    installAtRoot: [
      'Editor Default Resources',
      'WebPlayerTemplates',
      'Standard Assets',
      'StreamingAssets',
      'Plugins',
      'Gizmos',
    ],
    nested: [
      'Resources',
      'Editor',
    ]
  }
}

function getProjectRootFolder(callback) {
  findParent(__dirname, 'ProjectSettings', function (err, dir) {
    if (err) handleError (err, callback);
    if (dir) callback(null, dir);
  });
}

function hasSource(sourceFolder) {
  try {
    var fs = require('fs');
    var stats = fs.statSync(path.join(process.env.PWD, sourceFolder));
    return stats && stats.isDirectory();
  } catch (e) {
    return false;
  }
}

install = function (sourceFolder, packageName, callback) {
  if (!hasSource(sourceFolder))
    return;

	getProjectRootFolder(function (err, dir) {
		if (err) handleError(err, callback);
		if (dir) {
      const PACKAGES_FOLDER_NAME = 'Packages';
      const ASSETS_FOLDER = path.join(dir, 'Assets');
      const PACKAGE_FOLDER_INSTALL_PATH = path.join(ASSETS_FOLDER, PACKAGES_FOLDER_NAME, packageName);
      const DIVE_OPTIONS = {
        recursive: false,
        all: false,
        directories: true,
        files: false
      };

      function getFolderName(folder) {
        var folderParts = folder.split(path.sep);
        return folderParts[folderParts.length - 1];
      }

      function getTarget(folderName) {
        return path.join(RULES.folders.installAtRoot.indexOf(folderName) >= 0
          ? ASSETS_FOLDER : PACKAGE_FOLDER_INSTALL_PATH, folderName);
      }

      dive(sourceFolder, DIVE_OPTIONS, function(err, folder) {
        if (err) handleError(err, callback);
        var folderName = getFolderName(folder);
        var target = getTarget(folderName);
        copy(folder, target, ()=>
        {
          var message = 'Installed ' + packageName;
          console.log('> ' + message.cyan);
          if (callback) callback(null, PACKAGE_FOLDER_INSTALL_PATH);
        });
      });
		}
		else {
      handleError("Failed to install. Reason: No unity project found to install into!", callback);
		}
  });
}

function copy(source, target, callback) {
  mkdirp(target, err => {
    if (err) handleError(err, callback);
    ncp(source, target, err => {
      if (err) handleError(err, callback);
      callback();
      // console.log('copying from [' + source + ']\n          to [' + target + ']');
    });
  });
}

exports.install = install;
