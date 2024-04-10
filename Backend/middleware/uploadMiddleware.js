const multer = require("multer");  // Import multer for file uploading.

// Configuration for the storage engine of multer to store file..
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where files will be stored.
  },
  filename: function (req, file, cb) {
    // Define how the filename should be constructed.
    cb(null, `${file.fieldname  }-${  Date.now()  }${file.originalname}`);
    // Combines field name, current timestamp, and the original file name to create a unique file name.
  },
});

// Combines field name, current timestamp, and the original file name to create a unique file name.
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Check the file type to be either JPEG or PNG.
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true); // Accept the file if it matches the criteria.
    } else {
      cb(null, false); // Reject the file if it doesn't match.
      // Throw an error for invalid file types.
      return cb(new Error("Only .jpeg and .png files are allowed!"));
    }
  },
});

module.exports = upload;
