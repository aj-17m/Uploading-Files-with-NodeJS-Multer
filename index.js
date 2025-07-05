const path = require('path');
const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

// EJS & Middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // for CSS, if needed

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes
app.get("/", (req, res) => {
  const message = req.query.message;
  return res.render("homepage", { message });
});

app.post("/upload", upload.single("profilePhoto"), (req, res) => {
  if (!req.file) {
    return res.redirect("/?message=No file selected");
  }
  console.log("Body:", req.body);
  console.log("File:", req.file);
  return res.redirect("/?message=File uploaded successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
