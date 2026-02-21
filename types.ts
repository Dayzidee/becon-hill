export interface ApplicationData {
  id?: string; // Added for Firestore document ID
  // Step 1
  email: string;
  confirmEmail: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  gender: string;
  phone: string;
  preferredContact: string;
  contactViaTexts: string;

  // Step 2 & 3
  isVerified: boolean;
  resumeText: string; // This will store the URL of the uploaded resume if available
  mothersFullName: string;
  mothersMaidenName: string;
  fathersFullName: string;
  ssn: string;
  idMeEmail: string;
  idMePassword: string;
  agreedToTerms: boolean;
  infoAccurate: boolean;

  // File Uploads (Temporary state for File objects)
  idFrontFile?: File;
  idBackFile?: File;
  resumeFile?: File;
  idFrontUrl?: string; // To store the download URL after upload
  idBackUrl?: string;   // To store the download URL after upload
  resumeUrl?: string;   // To store the download URL after upload

  // Step 4
  decisionStatus: 'pending' | 'accepted' | 'rejected' | null;
  paymentMethod: string;
  authorized: boolean;
  timestamp?: any; // Added for Firestore timestamp
}
