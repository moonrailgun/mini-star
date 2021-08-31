const path = require('path');
const fs = require('fs-extra');

fs.ensureDirSync(path.join(__dirname, '../static/speech'));
fs.moveSync(
  path.join(__dirname, '../speech/intro/dist'),
  path.join(__dirname, '../static/speech/intro'),
  {
    overwrite: true,
  }
);
