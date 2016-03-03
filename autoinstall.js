var installer = require('../unity-package-installer');

var env = process.env;
var sourceFolder = env.npm_package_config_unity_package_installer_source || `source`;
var destination = env.npm_package_config_unity_install_path || env.npm_package_name;
installer.install(sourceFolder, destination);
