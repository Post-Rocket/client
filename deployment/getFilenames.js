const fs = require("fs");
const Path = require("path");

// Helper function to create a set from different input.
const makeSet = input => {
  (input instanceof Set)
  || (!input && (input = new Set))
  || (Array.isArray(input) && (input = new Set(input)))
  || (
    (typeof input === "string" && (input = new Set([input])))
    || (input = new Set(Array.from(input) || []))
  );
  return input;
}

// Helper function to get filenames in a folder.
const getFilenames = (
  dir,
  modifiedTime,
  blacklist = ["node_modules", "deployment", "secrets", ".DS_Store"],
  extensions,
  relative,
  _files
) => {
  // Normalize input.
  dir && typeof dir === "object" && (
    modifiedTime = dir.modifiedTime,
    blacklist = dir.blacklist,
    extensions = dir.extensions,
    relative = dir.relative,
    _files = dir.files || dir._files,
    dir = dir.dir || dir.filename || dir.folder || dir.file
  );
  relative === true && (relative = __dirname);
  _files || (_files = []);
  blacklist = makeSet(blacklist);
  extensions = makeSet(extensions);
  extensions.forEach(v => extensions.add(v.toLowerCase()));
  extensions.forEach(v => v.charAt(0) !== "." && extensions.add("." + v));

  // Array of directories.
  if (Array.isArray(dir)) return dir.map(x => getFilenames(
    x,
    modifiedTime,
    blacklist = ["node_modules", "deployment", "secrets"],
    extensions,
    relative
  )).flat();

  // Get filenames.
  const filenames = dir && (
    dir = `${dir}`,
    fs.lstatSync(dir).isDirectory() && fs.readdirSync(dir)
      || [`${dir}`]
  ) || [];

  // Push recursively filenames that ends with .js and are not part of the blacklist.
  for (let i = 0, l = filenames.length; i !== l; ++i) {
    // Get filename, full path and file info.
    const filename = filenames[i];
    let fileInfo = fs.lstatSync(dir), filePath = filename;
    fileInfo.isDirectory() && (
      filePath = Path.join(dir, filename),
      fileInfo = fs.lstatSync(filePath)
    );

    // Aggregate the files.
    blacklist.has(filename)
      || (fileInfo.isDirectory() && getFilenames(filePath, modifiedTime, blacklist, extensions, relative, _files))
      || (extensions.size && !extensions.has(Path.extname(filename).toLowerCase()))
      || ((!modifiedTime || (Date.now() - fileInfo.mtimeMs < modifiedTime)) && _files.push(filePath))
  }

  relative && (_files = _files.map(
    file => (
      file = Path.relative(relative, file),
      file.startsWith("../") && file || ("./" + file)
    )
  ));

  return _files;
}

// Export.
module.exports = Object.freeze(Object.defineProperty(getFilenames, "getFilenames", {
  value: getFilenames
}));