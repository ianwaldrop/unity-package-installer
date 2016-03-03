#!/bin/bash

if [[ "$PWD" =~ node_modules ]]
then
  node ../unity-package-installer/autoinstall.js
fi
