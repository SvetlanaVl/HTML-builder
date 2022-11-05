const fs = require('fs');
const path = require('path');
const { stdout } = process;

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if(err) throw err;

  files.forEach((element) => {
    fs.stat(path.join(__dirname, 'secret-folder', element), element.toString(), (err, stats) => {
      if(err) throw err;

      if (stats.isFile()) {
        let result = path.parse(element).name + ' - ' + (path.parse(element).ext).replace(/\./g, "") + ' - ' + stats.size / 1024 + 'kb';
        stdout.write(result + `\n`)
      }
    })
  })
});