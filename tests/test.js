var installer = require('./../index.js');

const PACKAGE_NAME = "test-package";

installer.install(__dirname, PACKAGE_NAME, function(err, dir) {
	if (err) {
		console.error(err);
		console.log("The most common reason for this is running the test from outside of a Unity project folder.");
		process.exit(1);
	}

	console.log(`Test success! Installed ${PACKAGE_NAME} to: ${dir}`);
});
