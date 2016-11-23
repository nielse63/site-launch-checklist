
var path = require('path')

const lib = path.resolve(__dirname, 'lib')
var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if( file === '.DS_Store' ) {
      return
    }
    const thisFile = path.resolve(dir, file)
    const libFile = thisFile.replace('lib', 'test')
    if(fs.existsSync(libFile)) {
      return
    }
    console.log(libFile)
    if(fs.statSync(thisFile).isDirectory()) {
      // filelist = walkSync(thisFile, filelist);
      fs.mkdirSync(libFile)
      walkSync(thisFile, filelist);
    } else {
      fs.writeFileSync(libFile, '')
      // filelist.push(thisFile);
    }
  });
  // return filelist;
};

walkSync(lib)
// files.forEach(function(file) {
//   const testFile = file.replace('lib', 'test')
//   if(fs.statSync(thisFile)) {
//     return
//   }
//   console.log(testFile)
// })
