const multer = require('multer');
const path = require('path');

// Настройка хранилища для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка, в которую будут сохраняться файлы
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
  }
});

const upload = multer({ storage });

// Обработчик загрузки файла
exports.uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка при загрузке файла' });
    }
    res.json({ message: 'Файл успешно загружен', filePath: `/uploads/${req.file.filename}` });
  });
};