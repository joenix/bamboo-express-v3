const router = require('express').Router();
const multer = require('multer');
const OSS = require('ali-oss');
const pro_cfg = require('../config.json');

// 配置 OSS 客户端
const client = new OSS({
  region: 'oss-cn-hangzhou', // 替换为你的区域
  accessKeyId: 'LTAI5tSaeKrMBGeQoSwobQAm',
  accessKeySecret: 'QATikRhjspb9f2oIRscypI333Lzgvm',
  bucket: 'lhdd-club'
});

// 使用 memoryStorage 将文件保存在内存中
const storage = multer.memoryStorage();

const upload_cfg = multer({ storage: storage });

router.post('/upload', upload_cfg.array('files', 10), upload);
router.get('/download', download);

// 上传到 OSS
async function upload(req, res) {
  const uploadResults = [];

  try {
    for (const file of req.files) {
      // 生成上传到 OSS 的文件名
      const fileName = `images/${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;

      // 将文件内容上传到阿里云 OSS
      const result = await client.put(fileName, file.buffer);
      const fileUrl = result.url.replace('http://', 'https://');

      // 返回 OSS 文件的 URL
      uploadResults.push({
        filename: fileName,
        path: fileUrl // OSS 返回的文件 URL
      });
    }

    res.send({
      status: 200,
      msg: uploadResults
    });
  } catch (err) {
    res.status(500).send({ status: 500, error: 'Multiple file upload failed', message: err.message });
  }
}

// 文件下载处理函数
async function download(req, res) {
  const fileName = req.query.filename;
  if (!fileName) {
    return res.status(400).send({ error: 'Filename is required' });
  }

  const fileUrl = `https://${client.options.bucket}.${client.options.region}.aliyuncs.com/uploads/${fileName}`;

  // 下载文件
  res.redirect(fileUrl);
}

module.exports = router;
