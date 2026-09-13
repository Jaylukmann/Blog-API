import {cloudinary} from "../config/cloudinary.js";
import { Readable } from "stream";

const uploadToCloudinary = (buffer, folder, mimeType) => {
  return new Promise((resolve, reject) => {

    let resourceType = "raw";

    if (mimeType.startsWith("image/")) {
      resourceType = "image";
    } else if (mimeType.startsWith("video/")) {
      resourceType = "video";
    } else if (mimeType.startsWith("audio/")) {
      resourceType = "video";
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType
      },
      (error, result) => {

        if (error) {
          reject(error);
        } else {
          resolve(result);
        }

      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary;