var findParent = require('find-parent-dir')
  , mkdirp = require('mkdirp')
  , path = require('path')
  , ncp = require('ncp')
;

const PACKAGES_FOLDER_NAME = 'Packages';

function handleError(err, callback) {
	if (callback) {
		callback(err)
	}
	else {
		console.error(err)
		process.exit(1)
	}
}

function getProjectRootFolder(callback) {
  findParent(__dirname, 'ProjectSettings', function (err, dir) {
    if (err) handleError (err, callback);
    if (dir) callback(null, dir);
  });
}

autoinstall = function() {
  var env = process.env;
  var sourceFolder = env.npm_package_config_unity_package_installer_source;
  if (sourceFolder) {
    var packageName = env.npm_package_name;
    var destination = env.npm_package_config_unity_package_installer_path || packageName;
    install(sourceFolder, destination);
  }
}

install = function (sourceFolder, packageName, callback) {
	getProjectRootFolder(function (err, dir) {
		if (err) handleError(err, callback);

		if (dir) {
			var destination = path.join(dir, 'Assets', 'Packages', packageName);

			// create folder hierarchy if necessary
		  mkdirp(destination, function (err) {
			  if (err) handleError(err, callback);

        console.log('> INSTALLED: Assets/Packages/' + packageName);

				// copy source folder to destination
			  ncp(sourceFolder, destination, function (err) {
				  if (err) handleError(err, callback);
				  if (callback) callback(null, destination);
			  });
		  });
		}
		else {
      handleError("Failed to install. Reason: No unity project found to install into!", callback);
		}
  });
}

exports.install = install;

autoinstall();
