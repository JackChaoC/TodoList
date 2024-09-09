const express = require('express');
const multer = require('multer');
const exec = require('../sqlServices/sql.js')
const uploadRouter = express.Router();


// 配置 multer 用于文件上传
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // 给文件名添加时间戳
    }
});

const upload = multer({ storage: storage });
let number = 0
// 文件上传路由
uploadRouter.post('/', upload.single('file'), async (req, res) => {
    try {
        console.log(`调用文件接口第${number++}次`);
        console.log(req.file);
        console.log(req.body);
        const { originalname, path, mimetype, size } = req.file;
        // 将文件信息保存到数据库
        const query = 'INSERT INTO files (filename, filepath, filetype, filesize) VALUES (?, ?, ?, ?)';
        const result = await exec(query, [originalname, path, mimetype, size])
        result.data = {
            originalname,
            path: '/' + path.replace(/\\/g, '/')
        }
        res.send(JSON.stringify(result));
    } catch (error) {
        res.send(error)
    }
});

module.exports = uploadRouter