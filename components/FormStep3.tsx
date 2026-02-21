
import React from 'react';
import { ApplicationData } from '../types';

interface Props {
  formData: ApplicationData;
  setFormData: (data: ApplicationData) => void;
}

const FormStep3: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[14px] font-bold text-gray-800 uppercase">MOTHERS FULL NAME: <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-[#066aab]"
            value={formData.mothersFullName}
            onChange={e => setFormData({ ...formData, mothersFullName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[14px] font-bold text-gray-800 uppercase">MOTHERS MAIDEN NAME: <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-[#066aab]"
            value={formData.mothersMaidenName}
            onChange={e => setFormData({ ...formData, mothersMaidenName: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[14px] font-bold text-gray-800 uppercase">FATHERS FULL NAME: <span className="text-red-500">*</span></label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-[#066aab]"
          value={formData.fathersFullName}
          onChange={e => setFormData({ ...formData, fathersFullName: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-[14px] font-bold text-gray-800 uppercase">Social Security Number <span className="text-red-500">*</span></label>
        <input
          type="password"
          placeholder="XXX-XX-XXXX"
          className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-[#066aab]"
          value={formData.ssn}
          onChange={e => setFormData({ ...formData, ssn: e.target.value })}
        />
        <p className="text-[11px] text-gray-500">Note: This is required for identity verification purposes and is securely stored.</p>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="text-[14px] font-bold text-gray-800 uppercase flex items-center gap-2">
          <i className="fa-solid fa-id-card-clip text-[#066aab]"></i> ID.me Login
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-gray-700 uppercase">ID.me Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-[#066aab]"
              value={formData.idMeEmail}
              onChange={e => setFormData({ ...formData, idMeEmail: e.target.value })}
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-gray-700 uppercase">ID.me Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-[#066aab]"
              value={formData.idMePassword}
              onChange={e => setFormData({ ...formData, idMePassword: e.target.value })}
              placeholder="••••••••"
            />
          </div>
        </div>
        <p className="text-[11px] text-gray-500">Note: Your ID.me credentials are required for secondary identity verification.</p>
      </div>
      <div className="space-y-3 pt-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="mt-1 w-4 h-4 text-[#066aab] rounded" checked={formData.agreedToTerms} onChange={e => setFormData({ ...formData, agreedToTerms: e.target.checked })} />
          <span className="text-sm text-gray-600 leading-tight">I agree to the terms and conditions <a href="#" className="text-blue-600 underline">Privacy Policy</a> <span className="text-red-500">*</span></span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="mt-1 w-4 h-4 text-[#066aab] rounded" checked={formData.infoAccurate} onChange={e => setFormData({ ...formData, infoAccurate: e.target.checked })} />
          <span className="text-sm text-gray-600 leading-tight">I confirm the information provided is accurate to the best of my knowledge. <span className="text-red-500">*</span></span>
        </label>
      </div>
    </div>
  );
};

export default FormStep3;
