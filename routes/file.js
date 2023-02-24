const express = require("express");
const File = require("../models/upload");
const multer  = require('multer');


const router = express.Router();

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

multer.memoryStorage({

})

const upload = multer().single('file');

router.post("/", upload, async (req, res) => {
    try {

        const file = new File(
            {name: req.file.originalname, image: {
                    data: JSON.stringify(req.file.buffer),
                    contentType: req.file.memetype
                }}
        )

        await file.save()

        return res.status(400).json({id: file.id});
      // upload(req, res, async (err) => {
      //     if(err) {
      //         return res.status(400).json(error);
      //     }
      //
      //     const file = new File(
      //         {name: req.body.name, image: {
      //             data: req.file.filename,
      //                 contentType: 'image/png'
      //             }}
      //     )
      //
      //     await file.save()
      //
      //
      //     return res.status(400).json(file);
      // });
    } catch (error) {
        res.status(400).json(error)
    }
});

module.exports = router;