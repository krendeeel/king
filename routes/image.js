const express = require("express");
const File = require("../models/upload");
const router = express.Router();
const fs = require('fs');

const cwd = process.cwd();

router.get("/:id", async (req, res) => {
    try {

        const file = await File.findById('63f90264d6322fdf9f1d87a8');

        if(!file) {
            return;
        }


        return res.status(200).json({
            buffer: new Buffer(file.image.data).toBinary()
        });

        // const file = await File.findById(req.params.id);
        //
        // if(!file) {
        //     return  res.status(401).json('ФИЛЕ НЕМА');
        // }

        // const readStream = fs.createReadStream(file.image.data.data);
        // return readStream.pipe(res);

        // const a = Buffer.from(file.image.data);
        //
        const readStream = fs.createReadStream('./nodejs.png');

        return readStream.pipe(res);

        await fs.writeFile(`./${newFileName}`, file.image.data, 'binary',  function (err) {
            if (err) {
                console.log("There was an error writing the image")
            }
            else {
                console.log("The sheel file was written")
            }
        });
       //
       // return res.status(200).sendFile(`${cwd}/${newFileName}`);

    } catch (error) {
        res.status(400).json(error)
    }
});

module.exports = router;