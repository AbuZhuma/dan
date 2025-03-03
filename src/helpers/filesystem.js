const fs = require('fs');
const path = require('path');

const createFile = (fileName, content, dir = './') => {
  const filePath = path.join(dir, fileName);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(`Ошибка при создании файла: ${err.message}`);
    } else {
      console.log(`Файл ${fileName} успешно создан.`);
    }
  });
};

const readFile = (fileName, dir = './') => {
  const filePath = path.join(dir, fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Ошибка при чтении файла: ${err.message}`);
    } else {
      console.log(`Содержимое файла ${fileName}:`);
      console.log(data);
    }
  });
};

const appendToFile = (fileName, content, dir = './') => {
  const filePath = path.join(dir, fileName);

  fs.appendFile(filePath, content, (err) => {
    if (err) {
      console.error(`Ошибка при добавлении в файл: ${err.message}`);
    } else {
      console.log(`Содержимое успешно добавлено в файл ${fileName}.`);
    }
  });
};

const deleteFile = (fileName, dir = './') => {
  const filePath = path.join(dir, fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Ошибка при удалении файла: ${err.message}`);
    } else {
      console.log(`Файл ${fileName} успешно удален.`);
    }
  });
};

const fileExists = (fileName, dir = './') => {
  const filePath = path.join(dir, fileName);

  return fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
};


module.exports = {
      createFile, 
      readFile, 
      appendToFile, 
      deleteFile,
      fileExists
}