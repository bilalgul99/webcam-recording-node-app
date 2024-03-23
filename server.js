const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('video'), (req, res) => {
  const tempPath = req.file.path;
  //the target path is the path where the file should be saved. the name of file will the ip address of the user
  targetPath = path.join(__dirname, 'uploads', req.file.originalname);
  // get the ip address of the user
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //rename the file to the ip address of the user plus the current time
  var d = new Date();
  var n = d.getTime();
  targetPath = path.join(__dirname, 'uploads',n + '.mp4');
  //move the file from the temp path to the target path
  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      res.status(500).send({ error: 'Error processing video' });
      console.error(err);
    } else {
      res.send({ success: true });
    }
  });
});

//listen on port 3000 by default and send the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index2.html'));
    }
);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});