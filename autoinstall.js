var installer = require('../unity-package-installer');

var env = process.env;
var sourceFolder = env.npm_package_config_unity_package_installer_source;
if (sourceFolder) {
  var packageName = env.npm_package_name;
  var destination = env.npm_package_config_unity_package_installer_path || packageName;
  installer.install(sourceFolder, destination);
}
