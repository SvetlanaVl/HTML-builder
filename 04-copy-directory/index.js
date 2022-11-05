const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
  if (err) throw err;

  fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
    if(err) throw err;

    if (files.length > 0) {
      files.forEach((element) => {
        fs.unlink(path.join(__dirname, 'files-copy', element), err => {
          if(err) throw err;

        });
      })
    }

    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
      if(err) throw err;

      files.forEach((element) => {
        fs.copyFile(path.join(__dirname, 'files', element), path.join(__dirname, 'files-copy', element), err => {
          if(err) throw err;
        });
      })
    });
  });
});
