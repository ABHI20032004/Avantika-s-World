import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    // ============================================================
    // TITLE
    // ============================================================

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },


    // ============================================================
    // MEDIA
    // ============================================================

    mediaUrl: {
      type: String,
      required: true,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },


    // ============================================================
    // CLOUDINARY
    // ============================================================

    publicId: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      default: "",
    },


    // ============================================================
    // CATEGORY
    // ============================================================

    category: {
      type: String,
      enum: [
        "Childhood",
        "Family",
        "School",
        "Friends",
        "Birthday",
        "Festival",
        "Vacation",
        "Sports",
        "Other",
      ],
      default: "Other",
    },


    // ============================================================
    // FAVORITE
    // ============================================================

    isFavorite: {
      type: Boolean,
      default: false,
    },


    // ============================================================
    // USER WHO UPLOADED THE MEMORY
    // ============================================================

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    // Automatically creates:
    // createdAt
    // updatedAt

    timestamps: true,
  }
);


const Memory = mongoose.model(
  "Memory",
  memorySchema
);

export default Memory;