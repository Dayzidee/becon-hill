import React from 'react';
import { ApplicationData } from '../types';

interface Props {
  formData: ApplicationData;
  setFormData: (data: ApplicationData) => void;
}

const FormStep2: React.FC<Props> = ({ formData, setFormData }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof ApplicationData) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        [fieldName]: e.target.files[0],
      });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="space-y-3">
        <label className="text-[14px] font-bold text-gray-800 uppercase">ID FRONT <span className="text-red-500">*</span></label>
        <div className="flex items-center gap-3">
          <input 
            type="file" 
            id="id-front" 
            className="hidden"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, 'idFrontFile')}
          />
          <label htmlFor="id-front" className="px-4 py-1 bg-[#efefef] border border-gray-300 rounded text-[13px] cursor-pointer hover:bg-gray-200">
            Choose File
          </label>
          <span className="text-[13px] text-gray-500">
            {formData.idFrontFile ? formData.idFrontFile.name : 'No file chosen'}
          </span>
        </div>
        <p className="text-[12px] text-gray-500 leading-tight">Instruction: Upload a clear image of the front of a valid ID (e.g., Driver’s License, Passport). (Max 5MB)</p>
      </div>

      <div className="space-y-3">
        <label className="text-[14px] font-bold text-gray-800 uppercase">ID BACK <span className="text-red-500">*</span></label>
        <div className="flex items-center gap-3">
          <input 
            type="file" 
            id="id-back" 
            className="hidden"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, 'idBackFile')}
          />
          <label htmlFor="id-back" className="px-4 py-1 bg-[#efefef] border border-gray-300 rounded text-[13px] cursor-pointer hover:bg-gray-200">
            Choose File
          </label>
          <span className="text-[13px] text-gray-500">
            {formData.idBackFile ? formData.idBackFile.name : 'No file chosen'}
          </span>
        </div>
        <p className="text-[12px] text-gray-500 leading-tight">Instruction: Upload a clear image of the back of a valid ID (e.g., Driver’s License, Passport). (Max 5MB)</p>
      </div>

      <div className="space-y-3">
        <label className="text-[14px] font-bold text-gray-800 uppercase tracking-tight">UPLOAD RESUME</label>
        <div className="flex items-center gap-3">
          <input 
            type="file" 
            id="resume-upload" 
            className="hidden"
            accept="application/pdf,.doc,.docx"
            onChange={(e) => handleFileChange(e, 'resumeFile')}
          />
          <label htmlFor="resume-upload" className="px-4 py-1 bg-[#efefef] border border-gray-300 rounded text-[13px] cursor-pointer hover:bg-gray-200">
            Choose File
          </label>
          <span className="text-[13px] text-gray-500">
            {formData.resumeFile ? formData.resumeFile.name : 'No file chosen'}
          </span>
        </div>
        <p className="text-[12px] text-gray-500">Accepted formats: pdf, docx (Max 10MB)</p>
      </div>
    </div>
  );
};

export default FormStep2;
