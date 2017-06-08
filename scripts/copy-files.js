// @flow weak
/* eslint no-console: "off", no-undef: "off" */

const path = require('path');
const fsex = require('fs-extra');

function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../dist/', path.basename(file));

  return new Promise((resolve) => {
    fsex.copy(file, buildPath, (err) => {
      if (err) throw err;
      resolve();
    });
  }).then(() => console.log(`Copied ${file} to ${buildPath}`));
}

function createPackageFile() {
  return new Promise((resolve) => {
    fsex.readFile(path.resolve(__dirname, '../package.json'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    });
  })
  .then((data) => JSON.parse(data))
  .then((packageData) => {
    const {
      author,
      version,
      description,
      keywords,
      repository,
      license,
      bugs,
      homepage,
      peerDependencies,
      dependencies,
    } = packageData;

    const minimalPackage = {
      name: 'subunit',
      author,
      version,
      description,
      main: './subunit.js',
      module: './subunit.js',
      'jsnext:main': './subunit.js',
      keywords,
      repository,
      license,
      bugs,
      homepage,
      peerDependencies,
      dependencies,
    };

    return new Promise((resolve) => {
      const buildPath = path.resolve(__dirname, '../dist/package.json');
      const data = JSON.stringify(minimalPackage, null, 2);
      fsex.writeFile(buildPath, data, (err) => {
        if (err) throw (err);
        console.log(`Created package.json in ${buildPath}`);
        resolve();
      });
    });
  });
}

const files = [
  'README.md',
  'LICENSE',
];

Promise
  .all(files.map((file) => copyFile(file)))
  .then(() => createPackageFile());
