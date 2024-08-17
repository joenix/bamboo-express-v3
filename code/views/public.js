const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pro_cfg = require("../config.json")

const file_path = pro_cfg["STATIC_PATH"]


// 设置存储方式
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, file_path); // 存储文件的目录
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // 文件名
  }
});

const upload_cfg = multer({ storage: storage });

router.post('/upload', upload_cfg.array('files', 10), upload);
router.get("/download", download);


async function upload(req, res) {
  let file_path = "https://api.lhdd.club"
  // let file_path = "http://127.0.0.1:3000"
  try {
    res.send({
      status: 200,
      files: req.files.map(file => ({
        filename: file.filename,
        path: file_path + "/uploads/" + file.filename
      }))
    });
  } catch (err) {
    res.status(200).send({ status: 500, error: 'Multiple file upload failed' });
  }
}

// 文件下载处理函数
async function download(req, res) {
  const fileName = req.query.filename;
  if (!fileName) {
    return res.status(400).send({ error: 'Filename is required' });
  }
  const filePath = path.join(file_path, fileName);
  console.log('filePath', filePath)
  // 检查文件是否存在
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send({ error: 'File not found' });
    }

    // 下载文件
    res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(200).send({ status: 500, error: 'File download failed' });
      }
    });
  });
}


module.exports = router;
