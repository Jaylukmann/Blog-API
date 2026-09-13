import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // Images
    "image/jpeg",
    "image/png",
    "image/webp",

    // Videos
    "video/mp4",
    "video/mpeg",
    "video/webm",
    "video/quicktime",

    // Audio
    "audio/mpeg",
    "audio/wav",
    "audio/mp4",
    "audio/x-m4a",

    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // Excel
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type. Images, videos, audio and documents are allowed."
      ),
      false
    );
  }
};

export const uploadFile = () => {
  return multer({
    storage,

    limits: {
      fileSize: 50 * 1024 * 1024,
      files: 5
    },

    fileFilter
  });
};