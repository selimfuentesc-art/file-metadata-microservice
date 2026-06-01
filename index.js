const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.static("public"));

const upload = multer({ storage: multer.memoryStorage() });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server is running on port " + port);
});