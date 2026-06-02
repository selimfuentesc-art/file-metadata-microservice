var express = require('express');
var cors = require('cors');
var multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

var upload = multer({ dest: 'uploads/' });

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  console.log("FCC llegó al endpoint");
  console.log(req.file);

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});