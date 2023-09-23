const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // Importing .env configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

function uploadToCloudinary(filePath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        use_filename: true,
        unique_filename: false,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
  });
}

function main(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) return console.error("Error reading directory", err);

    const promises = files.map((file) => {
      const filePath = path.join(folderPath, file);
      return uploadToCloudinary(filePath);
    });

    Promise.all(promises)
      .then((results) => console.log("All files uploaded:", results))
      .catch((error) => console.error("Error uploading files:", error));
  });
}

// Example usage
const folderPath = "/Users/mark/Downloads/JAC Mockups";
main(folderPath);
