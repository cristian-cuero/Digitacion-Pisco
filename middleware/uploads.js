// middlewares/upload.js
const multer = require("multer");

const storage = multer.memoryStorage(); // o diskStorage si quieres guardar en disco

const upload = multer({ storage });

module.exports = upload;
