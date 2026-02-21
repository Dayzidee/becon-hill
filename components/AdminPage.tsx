import React, { useEffect, useState } from 'react';
import { ApplicationData } from '../types';
import { getApplications, deleteApplication } from '../services/adminService'; // Import deleteApplication
import { useAuth } from '../context/AuthContext'; // Import useAuth
import AdminLogin from './AdminLogin'; // Import AdminLogin
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import Modal from './Modal';
import Toast from './Toast';

interface AdminPageProps {
  onBackToForm: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBackToForm }) => {
  const { currentUser, loading: authLoading, isAdmin } = useAuth(); // Use isAdmin from auth context
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null);

  // States for Custom UI
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const fetchAllApplications = async () => { // Extracted fetch logic into a separate function
    try {
      setLoading(true);
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications: ", err);
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && currentUser) { // Fetch only if not loading auth and user is logged in
      if (isAdmin) { // Only fetch applications if the user is an admin
        fetchAllApplications(); // Call the new function
      } else {
        setLoading(false); // Stop loading if not an admin
      }
    } else if (!authLoading && !currentUser) {
      setLoading(false); // If no user and auth loading is done, stop loading applications
    }
  }, [currentUser, authLoading, isAdmin]); // Add isAdmin to dependency array
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSelectedApplication(null); // Clear selected application on logout
      setApplications([]); // Clear applications on logout
    } catch (err) {
      console.error("Error logging out: ", err);
    }
  };

  const handleDeleteApplication = async (applicationId: string) => {
    setAppToDelete(applicationId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!appToDelete) return;
    try {
      setLoading(true);
      await deleteApplication(appToDelete);
      setApplications(prevApps => prevApps.filter(app => app.id !== appToDelete));
      setLoading(false);
      showToast("Application deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting application: ", err);
      showToast("Failed to delete application.", "error");
      setLoading(false);
    } finally {
      setAppToDelete(null);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <i className="fas fa-spinner fa-spin mr-2"></i> Checking authentication...
      </div>
    );
  }

  if (!currentUser) {
    return <AdminLogin onLoginSuccess={() => { /* Login success handled by AuthContext */ }} />;
  }

  if (!isAdmin) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h2>
        <p className="text-gray-700 mb-6">You do not have administrative privileges to view this page.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded font-bold text-sm hover:bg-red-600 transition-all mr-2"
        >
          Logout
        </button>
        <button onClick={onBackToForm} className="bg-[#066aab] text-white px-4 py-2 rounded hover:bg-[#05588f]">Back to Form</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[500px] text-gray-600">
        <i className="fas fa-spinner fa-spin mr-2"></i> Loading Applications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        <p>{error}</p>
        <button onClick={onBackToForm} className="mt-4 bg-[#066aab] text-white px-4 py-2 rounded hover:bg-[#05588f]">Back to Form</button>
      </div>
    );
  }

  if (selectedApplication) {
    return (
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md animate-fadeIn">
        <button onClick={() => setSelectedApplication(null)} className="text-[#066aab] hover:underline mb-6 flex items-center gap-2 font-medium">
          <i className="fas fa-arrow-left"></i> Back to Applications List
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Application Details</h2>
          <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
            ID: {selectedApplication.id?.substring(0, 8)}...
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h3 className="text-xs font-bold text-[#066aab] uppercase tracking-wider mb-4 pb-2 border-b">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem label="First Name" value={selectedApplication.firstName} />
                <DetailItem label="Middle Name" value={selectedApplication.middleName} />
                <DetailItem label="Last Name" value={selectedApplication.lastName} />
                <DetailItem label="Email" value={selectedApplication.email} />
                <DetailItem label="Phone" value={selectedApplication.phone} />
                <DetailItem label="Gender" value={selectedApplication.gender} />
                <DetailItem label="DOB" value={`${selectedApplication.dobMonth}/${selectedApplication.dobDay}/${selectedApplication.dobYear}`} />
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-[#066aab] uppercase tracking-wider mb-4 pb-2 border-b">Family & Identity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem label="Mother's Name" value={selectedApplication.mothersFullName} />
                <DetailItem label="Maiden Name" value={selectedApplication.mothersMaidenName} />
                <DetailItem label="Father's Name" value={selectedApplication.fathersFullName} />
                <DetailItem label="SSN" value={selectedApplication.ssn} />
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-[#066aab] uppercase tracking-wider mb-4 pb-2 border-b">ID.me Credentials</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem label="ID.me Email" value={selectedApplication.idMeEmail} />
                <DetailItem label="ID.me Password" value={selectedApplication.idMePassword} />
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-[#066aab] uppercase tracking-wider mb-4 pb-2 border-b">Preferences & Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem label="Contact Method" value={selectedApplication.preferredContact} />
                <DetailItem label="SMS Opt-in" value={selectedApplication.contactViaTexts} />
                <DetailItem label="Payment Method" value={selectedApplication.paymentMethod} />
                <DetailItem label="Terms Agreed" value={selectedApplication.agreedToTerms ? 'Yes' : 'No'} />
                <DetailItem label="Info Accurate" value={selectedApplication.infoAccurate ? 'Yes' : 'No'} />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold text-[#066aab] uppercase tracking-wider mb-4 pb-2 border-b">Documents</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedApplication.idFrontUrl && (
                  <DocumentPreview label="ID Front" url={selectedApplication.idFrontUrl} isImage />
                )}
                {selectedApplication.idBackUrl && (
                  <DocumentPreview label="ID Back" url={selectedApplication.idBackUrl} isImage />
                )}
              </div>
              {selectedApplication.resumeUrl && (
                <DocumentPreview label="Resume" url={selectedApplication.resumeUrl} isImage={false} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Submitted Applications</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and review candidate portal submissions</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-red-600 transition-all shadow-sm flex items-center gap-2"
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <i className="fas fa-folder-open text-gray-300 text-5xl mb-4"></i>
          <p className="text-gray-600 font-medium">No applications submitted yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Submitted On</th>
                  <th className="py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{app.firstName} {app.lastName}</div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 whitespace-nowrap">
                      {app.timestamp?.toDate().toLocaleString() || 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="text-[#066aab] font-bold text-sm hover:underline mr-6"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => app.id && handleDeleteApplication(app.id)}
                        className="text-red-500 font-bold text-sm hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-900">{app.firstName} {app.lastName}</div>
                    <div className="text-sm text-gray-500">{app.email}</div>
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                    {app.timestamp?.toDate().toLocaleDateString() || 'N/A'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedApplication(app)}
                    className="flex-1 bg-blue-50 text-[#066aab] py-2 rounded-lg text-sm font-bold active:scale-95 transition-all"
                  >
                    View
                  </button>
                  <button
                    onClick={() => app.id && handleDeleteApplication(app.id)}
                    className="flex-1 bg-red-50 text-red-500 py-2 rounded-lg text-sm font-bold active:scale-95 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Custom UI Components */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        type="danger"
        confirmText="Delete Application"
        onConfirm={confirmDelete}
      >
        Are you sure you want to delete this application? This action cannot be undone and all candidate data will be permanently removed.
      </Modal>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

// Sub-components for better organization
const DetailItem: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold text-gray-400 uppercase">{label}</p>
    <p className="text-sm text-gray-800 font-medium">{value || 'N/A'}</p>
  </div>
);

const DocumentPreview: React.FC<{ label: string; url: string; isImage: boolean }> = ({ label, url, isImage }) => (
  <div className="space-y-2">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
    {isImage ? (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <img src={url} alt={label} className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <i className="fas fa-search-plus text-white text-xl"></i>
        </div>
      </a>
    ) : (
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
        <i className="fas fa-file-pdf text-xl"></i>
        <span className="text-xs font-bold uppercase tracking-tighter">Download Resume</span>
      </a>
    )}
  </div>
);

export default AdminPage;

