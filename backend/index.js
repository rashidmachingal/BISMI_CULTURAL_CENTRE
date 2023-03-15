const express = require("express");
const app = express();
const cors = require("cors");
const multer = require('multer');
const fs = require('fs')
const path = require('path')

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "uploads")));
app.use('/uploads', express.static('uploads'));

// configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});
const upload = multer({ storage: storage });

// route to upload image
app.post('/upload', upload.single('image'), (req, res) => {
    res.send('File uploaded successfully');
});

// route to get all images
app.get('/images', (req, res) => {
    const directoryPath = __dirname + '/uploads';
    let imageList = [];
  
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
  
      files.forEach(function (file) {
          imageList.push(file);
      });
  
      res.json({ images: imageList });
    });
  });


// app connection
app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend server running`);
});