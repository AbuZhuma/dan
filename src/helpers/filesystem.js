const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
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

async function deleteFile(filePath) {
  const fullPath = path.join(__dirname,'..', '..', 'public', filePath);
  try {
    await unlinkAsync(fullPath); 
    console.log(`Файл успешно удалён: ${filePath}`);
    return { success: true, message: `Файл успешно удалён: ${filePath}` };
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`Файл не найден: ${filePath}`);
      return { success: false, message: `Файл не найден: ${filePath}` };
    } else {
      console.error(`Ошибка при удалении файла: ${err.message}`);
      return { success: false, message: `Ошибка при удалении файла: ${err.message}` };
    }
  }
}


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