const fs = require('fs');
const path = require('path');

let content = '';
let arrStyle = [];

fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), content, (err) => {
  if (err) throw err;

  fs.readFile(path.join(__dirname, 'project-dist', 'bundle.css'), (err, files) => {
    if(err) throw err;

    fs.truncate(path.join(__dirname, 'project-dist', 'bundle.css'), err => {
      if(err) throw err;
    });

    fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
      if(err) throw err;

      files.forEach((element) => {

        fs.stat(path.join(__dirname, 'styles', element), element.toString(), (err, stats) => {
          if(err) throw err;

          if (stats.isFile() && path.parse(element).ext === '.css') {
            fs.readFile(path.join(__dirname, 'styles', element), (err, data) => {
              if(err) throw err;

              arrStyle.push(data)

              fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), arrStyle.join('\n'), (err) => {
                if(err) throw err;
              })
            })
          }
        })
      });
    });
  });
});