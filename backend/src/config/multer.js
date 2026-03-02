import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ✔️ Correct folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}_${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "text/csv",
    "application/json",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true); // accept
  } else {
    cb(new Error("Invalid File Type"), false); // reject
  }
};

export const upload = multer({
  storage,
  fileFilter,
});
