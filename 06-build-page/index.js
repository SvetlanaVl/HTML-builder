const fs = require('fs');
const path = require('path');

let content = '';
let arrStyle = [];
let arrHtml = [];
let nameComponents = [];
let result ={};

let pathCreatedFolder = path.join(__dirname, 'project-dist');

fs.rm(pathCreatedFolder, { recursive: true, force: true }, err => {
  if (err) throw err;
  fs.mkdir(pathCreatedFolder, { recursive: true }, err => {
    if (err) throw err;

    fs.appendFile(pathCreatedFolder + '/' + 'index.html', content, (err) => {
      if (err) throw err;

      fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
        if(err) throw err;

      })

      fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
        if(err) throw err;

        arrHtml.push(data);

        fs.readdir(path.join(__dirname, 'components'), (err, files) => {
          if(err) throw err;
          let strArrHtml = arrHtml.join('\n');

          files.forEach((element) => {
            fs.readFile(path.join(__dirname, 'components', element), 'utf8', (err, fileContentReplaced) => {
              if(err) throw err;

              result[path.parse(element).name] = fileContentReplaced;

              fs.stat(path.join(__dirname, 'components', element), element.toString(), (err, stats) => {
                if(err) throw err;

                if (stats.isFile() && path.parse(element).ext === ".html") {
                  nameComponents.push(path.parse(element).name);
                };
                nameComponents.forEach((component) => {
                  if(arrHtml.join('\n').indexOf('{{' + component + '}}')) {
                    for (let key in result) {
                      strArrHtml = strArrHtml.replace(new RegExp('{{' + key + '}}', 'ig'), result[key]);
                    };
                  };
                });
                fs.writeFile(pathCreatedFolder + '/' + 'index.html', strArrHtml, (err) => {
                  if(err) throw err;
                });
              });
            });
          });
        }); 
      });
    });

    fs.appendFile(pathCreatedFolder + '/' + 'style.css', content, (err) => {
      if (err) throw err;
  
      fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
        if(err) throw err;
  
        files.forEach((element) => {
  
          fs.stat(path.join(__dirname, 'styles', element), element.toString(), (err, stats) => {
            if(err) throw err;
  
            if (stats.isFile() && path.parse(element).ext === '.css') {
              fs.readFile(path.join(__dirname, 'styles', element), (err, data) => {
                if(err) throw err;
  
                arrStyle.push(data)
  
                fs.writeFile(pathCreatedFolder + '/' + 'style.css', arrStyle.join('\n'), (err) => {
                  if(err) throw err;
                });
              });
            };
          });
        });
      });
    });

    fs.mkdir(pathCreatedFolder + '/' + 'assets', { recursive: true }, err => {
      if (err) throw err;
  
      fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
        if(err) throw err;
  
        files.forEach((element) => {
          fs.stat(path.join(__dirname, 'assets', element), element.toString(), (err, stats) => {
            if(err) throw err;
  
            if (stats.isDirectory()) {
              let nameFolder = path.parse(element).name;
  
              fs.mkdir(pathCreatedFolder + '/' + 'assets' + '/' + nameFolder, { recursive: true }, err => {
                if (err) throw err;
  
                fs.readdir(path.join(__dirname, 'assets', nameFolder), (err, files) => {
                  if(err) throw err;
  
                  files.forEach((element) => {
                    fs.copyFile(path.join(__dirname, 'assets', nameFolder, element), pathCreatedFolder + '/' + 'assets' + '/' + nameFolder + '/' + element, err => {
                      if(err) throw err;
                    });
                  });
                });
              });
            };
          });
        });
      });
    });
  });
});