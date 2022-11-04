const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

stdout.write('Hello! You can enter any text \n');

let content = '';

fs.appendFile(path.join(__dirname, 'text.txt'), content, (err) => {
  if (err) throw err;
  
  stdin.on('data', data => {
    if(data.toString().trim() === 'exit') {
      stdout.write('Good luck with your studies! Have a nice day!')
      process.exit();
    }
    fs.appendFile(path.join(__dirname, 'text.txt'), data, (err) => {
      if (err) throw err;
      
    })
  })
})

process.on('SIGINT', () => {
  stdout.write('Good luck with your studies! Have a nice day!')
  process.exit();
});