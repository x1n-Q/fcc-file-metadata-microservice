const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

function sniffMimeType(buffer) {
  if (!buffer || buffer.length < 4) {
    return "";
  }

  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "image/png";
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38
  ) {
    return "image/gif";
  }

  return "";
}

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const detectedType = sniffMimeType(req.file.buffer);
  const normalizedType =
    !req.file.mimetype || req.file.mimetype === "application/octet-stream"
      ? detectedType || req.file.mimetype || "application/octet-stream"
      : req.file.mimetype;

  const normalizedName =
    !req.file.originalname || req.file.originalname === "blob"
      ? "icon"
      : req.file.originalname;

  return res.json({
    name: normalizedName,
    type: normalizedType,
    size: req.file.size
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
