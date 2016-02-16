var findParent = require('find-parent-dir')
  , mkdirp = require('mkdirp')
  , path = require('path')
  , ncp = require('ncp')
;

const PACKAGES_FOLDER_NAME = 'Packages';

function handleError(err, callback) {
	if (callback) {
		callback(err);
	}
	else {
		console.error(err);
		process.exit(1);
	}
}

function getProjectRootFolder(callback) {
    findParent(__dirname, 'ProjectSettings', function (err, dir) {
      if (err) handleError (err, callback);
      if (dir) callback(null, dir);
  });
}

exports.install = function (sourceFolder, packageName, callback) {
	getProjectRootFolder(function (err, dir) {
		if (err) handleError(err, callback);

		if (dir) {
			var destination = path.join(dir, 'Assets', 'Packages', packageName);

			// create folder hierarchy if necessary
		  mkdirp(destination, function (err) {
			  if (err) handleError(err, callback);

				// copy source folder to destination
			  ncp(sourceFolder, destination, function (err) {
				  if (err) handleError(err, callback);
				  if (callback) callback(null, destination);
			  });
		  });
		}
		else {
			callback("Failed to install. Reason: No unity project found to install into!")
		}
	});
};
