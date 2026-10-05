import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Product from "../models/product.js";

cloudinary.v2.config({
  cloud_name: "",
  api_key: ,
  api_secret: '',
});



// -----------------------------
// connect MongoDB
// -----------------------------
await mongoose.connect(
  "",
  { bufferCommands: false }
);

// -----------------------------
// get images from folder
// -----------------------------
function getImages(folder) {
  return fs
    .readdirSync(folder)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map(f => path.join(folder, f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

// -----------------------------
// upload local file
// -----------------------------
function uploadImage(filePath, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      filePath,
      {
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }
    );
  });
}

// -----------------------------
// CREATE SINGLE PRODUCT
// -----------------------------
async function createSingleProduct(data) {
  const files = getImages(data.imgFolder);

  if (!files.length) {
    console.log("❌ No images found");
    return;
  }

  const uploadedImages = [];

  for (let file of files) {
    const fileName = path.basename(file, path.extname(file));

    const publicId =
      "products/" +
      data.name.toLowerCase().replace(/\s+/g, "_") +
      "_" +
      fileName;

    const url = await uploadImage(file, publicId);

    uploadedImages.push(url);

    console.log("Uploaded:", url);
  }

  const product = await Product.create({
    name: data.name,
    category: data.category,
    price: data.price,
    year: data.year,
    manufacturer: data.manufacturer,
    model: data.model,
    hours: data.hours || 0,
    miles: data.miles, 
    description: data.description,
    engineHorsepower: data.engineHorsepower || 0,
    imgs: uploadedImages,
  });

  console.log("✅ PRODUCT CREATED:", product._id);
}

// -----------------------------
// 1 SINGUR PRODUS (EXEMPLU)
// -----------------------------
await createSingleProduct({
  name: "2022 MERLO P27.6EE4 PLUS ",
  category: "construction",
  price: 18300,
  year: 2022,
  manufacturer: "MERLO ",
  model: " P27.6EE4 PLUS",
  hours: 809,
  // miles: 80190,
  description:
  ` 
    with 809 hours and a Kohler 2.5 CTR engine. Features automatic transmission, 4'1" forks, steel 12-16.5 wheels, and compact transport dimensions. Unit started on site but full operation was not tested; reported issues include an oil leak, missing hydraulic cover and mirror, and cracked light housings.
  `,
  // engineHorsepower: 0,
  imgFolder:
   "/home/lucky/Downloads/us/Machinery/2022 MERLO P27.6EE4 PLUS - $45,995/m/m"
});

// -----------------------------
// disconnect
// -----------------------------
await mongoose.disconnect();




