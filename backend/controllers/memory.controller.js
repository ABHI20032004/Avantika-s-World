import cloudinary from "../config/cloudinary.js";
import Memory from "../models/Memory.js";


// ============================================================
// CLOUDINARY UPLOAD
// ============================================================

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const resourceType = file.mimetype.startsWith("video/")
      ? "video"
      : "image";

    console.log("Uploading to Cloudinary...");
    console.log("File:", file.originalname);
    console.log("Type:", file.mimetype);
    console.log("Resource type:", resourceType);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: "memory-vault",
      },
      (error, result) => {
        if (error) {
          console.error("CLOUDINARY ERROR:", error);
          reject(error);
          return;
        }

        console.log("Cloudinary upload successful.");
        console.log("URL:", result.secure_url);

        resolve(result);
      }
    );

    uploadStream.end(file.buffer);
  });
};


// ============================================================
// CREATE MEMORY
// ============================================================

export const createMemory = async (req, res) => {
  try {
    console.log("\n========== MEMORY UPLOAD ==========");

    console.log("User ID:", req.userId);

    console.log("File received:", !!req.file);

    console.log("Body:", req.body);


    // --------------------------------------------------------
    // Check file
    // --------------------------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a photo or video.",
      });
    }


    // --------------------------------------------------------
    // Only fields coming from Upload.jsx
    // --------------------------------------------------------

    const {
      title,
      category,
    } = req.body;


    // --------------------------------------------------------
    // Validate title
    // --------------------------------------------------------

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }


    // --------------------------------------------------------
    // Upload to Cloudinary
    // --------------------------------------------------------

    const result =
      await uploadToCloudinary(req.file);


    // --------------------------------------------------------
    // Determine media type
    // --------------------------------------------------------

    const mediaType =
      req.file.mimetype.startsWith("video/")
        ? "video"
        : "image";


    // --------------------------------------------------------
    // Create MongoDB document
    // --------------------------------------------------------
    //
    // createdAt and updatedAt are automatically created
    // by Mongoose because timestamps: true is enabled
    // in Memory.js.
    //

    const memory = await Memory.create({

      title: title.trim(),

      category:
        category?.trim() || "Other",

      mediaUrl:
        result.secure_url,

      publicId:
        result.public_id,

      mediaType,

      thumbnailUrl:
        mediaType === "video"
          ? result.secure_url.replace(
              "/upload/",
              "/upload/so_0/"
            )
          : result.secure_url,

      uploadedBy:
        req.userId,
    });


    console.log(
      "MongoDB memory created:",
      memory._id
    );

    console.log(
      "Created at:",
      memory.createdAt
    );

    console.log(
      "========== UPLOAD SUCCESS ==========\n"
    );


    return res.status(201).json({
      success: true,
      message:
        "Memory uploaded successfully.",
      memory,
    });

  } catch (error) {

    console.error(
      "\n========== MEMORY UPLOAD ERROR =========="
    );

    console.error(
      "Name:",
      error.name
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Full error:",
      error
    );

    console.error(
      "========================================\n"
    );


    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to upload memory.",
    });
  }
};


// ============================================================
// GET MEMORIES
// ============================================================

export const getMemories = async (req, res) => {
  try {

    const memories = await Memory.find()
      .sort({
        createdAt: -1,
      });


    return res.status(200).json({
      success: true,
      memories,
    });

  } catch (error) {

    console.error(
      "GET MEMORIES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch memories",
      error: error.message,
    });
  }
};