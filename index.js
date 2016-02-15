var findParent = require('find-parent-dir')
  , mkdirp = require('mkdirp')
  , path = require('path')
  , ncp = require('ncp')
;

exports.install = function (sourceFolder, packageName, callback) {

	findParent(__dirname, 'ProjectSettings', function (err, dir) {
		if (err) {
			console.error(err);
			process.exit(1);
			callback(err);
		}

		if (dir) {
			var unityAssetsPath = path.join(dir, 'Assets');
			var dir = path.join(unityAssetsPath, 'packages', packageName);

			// Create folder if missing
			mkdirp(dir, function (err) {
				if (err) {
					console.error(err);
					process.exit(1);
					callback(err);
			  	}

			  	// Copy files
				ncp(sourceFolder, dir, function (err) {
					if (err) {
						console.error(err);
						process.exit(1);
						callback(err);
					}

					callback(null, dir);
			  	});
			});
		}
		else {
			callback("Failed to install. Reason: No unity project found to install into!")
		}
	});
};
