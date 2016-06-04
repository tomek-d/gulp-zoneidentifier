var through = require('through2');
var File = require('vinyl');
var merge = require('lodash/merge');
var path = require('path');

var DEFAULT_ZONE_IDENTIFIER = 3;
var DEFAULT_FILE_EXTENSIONS = ['.js', '.html'];

function shouldCreateZoneInfoFile(filePath, fileExt) {
  return filePath && fileExt.includes(path.extname(filePath));
}

function createZoneInfoFile (file, zoneId) {
  return new File({
    cwd: file.cwd,
    base: file.base,
    path: file.path + ':Zone.Identifier',
    contents: new Buffer('[ZoneTransfer]\r\nZoneId=' + zoneId)
  });
}

function addZoneIdentifier (zoneId, fileExt) {
  return function (file, enc, done) {
    this.push(file);

    if (shouldCreateZoneInfoFile(file.path, fileExt)) {
      this.push(createZoneInfoFile(file, zoneId));
    }

    done();
  }
}

function zoneIdentifierPlugin(opts) {
  opts = merge({
    zoneId: DEFAULT_ZONE_IDENTIFIER,
    fileExt: DEFAULT_FILE_EXTENSIONS
  }, opts || {});

  return through.obj(addZoneIdentifier(opts.zoneId, opts.fileExt));
}

module.exports = zoneIdentifierPlugin;
