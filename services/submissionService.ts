import { db } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Removed for Cloudinary
import axios from 'axios';
import { ApplicationData } from '../types';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqqpaaysj';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'beacon_hill_applications';

interface ApplicationFiles {
  idFront?: File;
  idBack?: File;
  resume?: File;
}

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  // Optional: You can append folder here if not set in preset or for dynamic folders
  // formData.append('folder', 'beacon_hill_uploads');

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, // Changed from /image/upload to /auto/upload
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } } // Explicitly set content type
    );
    return response.data.secure_url; // Return the secure URL of the uploaded file
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Cloudinary upload error response data: ", error.response.data);
      console.error("Cloudinary upload error status: ", error.response.status);
      console.error("Cloudinary upload error headers: ", error.response.headers);
    } else {
      console.error("An unexpected error occurred during Cloudinary upload: ", error);
    }
    throw new Error("Failed to upload file to Cloudinary."); // Standardize error message
  }
};

export const submitApplication = async (
  formData: ApplicationData,
  files: ApplicationFiles
): Promise<void> => {
  try {
    const uploadedFileUrls: { [key: string]: string } = {};

    if (files.idFront) {
      uploadedFileUrls.idFrontUrl = await uploadFile(files.idFront);
    }
    if (files.idBack) {
      uploadedFileUrls.idBackUrl = await uploadFile(files.idBack);
    }
    if (files.resume) {
      uploadedFileUrls.resumeUrl = await uploadFile(files.resume);
    }

    // Create a new object for Firestore, merging formData with file URLs
    const dataToSubmit = {
      ...formData,
      ...uploadedFileUrls,
      timestamp: serverTimestamp(),
    };

    // Remove the File objects from dataToSubmit before sending to Firestore
    // This assumes ApplicationData might contain these fields. If not, these lines will have no effect.
    delete (dataToSubmit as any).idFrontFile;
    delete (dataToSubmit as any).idBackFile;
    delete (dataToSubmit as any).resumeFile;

    await addDoc(collection(db, "applications"), dataToSubmit);
    console.log("Application submitted successfully to Firestore and Cloudinary!");
  } catch (error) {
    console.error("Error submitting application: ", error);
    throw error; // Re-throw to be handled by the component
  }
};

