import { db } from '../utils/firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore'; // Import doc and deleteDoc
import { ApplicationData } from '../types';

export const getApplications = async (): Promise<ApplicationData[]> => {
  try {
    const q = query(collection(db, "applications"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const applications: ApplicationData[] = [];
    querySnapshot.forEach((doc) => {
      // Explicitly cast the data to ApplicationData, handling potential missing fields
      const data = doc.data() as ApplicationData;
      applications.push({
        id: doc.id, // Add document ID for deletion and detail viewing
        ...data,
        // Firebase timestamp needs to be converted if used in UI
        // The `timestamp` property on `ApplicationData` needs to be `any` or `firebase.firestore.Timestamp` for direct storage
        // For display, it will be converted using `.toDate()` in the component.
        timestamp: data.timestamp // Keep it as is from Firestore for now
      });
    });
    return applications;
  } catch (error) {
    console.error("Error fetching applications from Firestore: ", error);
    throw error;
  }
};

export const deleteApplication = async (applicationId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "applications", applicationId));
    console.log("Application successfully deleted!");
  } catch (error) {
    console.error("Error deleting application: ", error);
    throw error;
  }
};
