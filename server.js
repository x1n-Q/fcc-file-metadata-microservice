const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  return res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
