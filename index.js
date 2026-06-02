const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post(["/api/fileanalyse", "/api/fileanalyse/"], upload.single("upfile"), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Running on port " + port);
});