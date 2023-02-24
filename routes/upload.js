const express = require("express");
const fs = require("fs");
const multer  = require('multer');
const router = express.Router();

const Upload = require("../models/upload");

const uploadMiddleware = multer().single('file');

router.post("/", uploadMiddleware, async (req, res) => {
    try {
        const { file } = req;

        const upload = new Upload({
            data: file.buffer,
            name: file.originalname,
            contentType: file.mimetype
        })

        await upload.save()

        return res.status(200).json({id: upload.id});
    } catch (error) {
        res.status(400).json(error)
    }
});


router.get("/:id", async (req, res) => {
    try {
        const fileId = req.params.id;

        const file = await Upload.findById(fileId);

        if(!file) {
            res.status(404).json(`Файл с id ${fileId} не нвйден :(`);
        }

        const readStream = fs.createReadStream(file.data);

        return readStream.pipe(res);

        // const [_, fileExtension] = file.contentType.split('/');
        //
        // const filePath = `./upload/${fileId}.${fileExtension}`;
        //
        // fs.writeFile(filePath, file.data, 'binary',  (err) => {
        //     if(!err) {
        //         const readStream = fs.createReadStream(filePath);
        //
        //         return readStream.pipe(res);
        //     }
        // });

    } catch (error) {
        res.status(400).json(error)
    }
});


module.exports = router;