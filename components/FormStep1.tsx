
import React from 'react';
import { ApplicationData } from '../types';

interface Props {
  formData: ApplicationData;
  setFormData: (data: ApplicationData) => void;
}

const FormStep1: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-2">
        <label className="text-[14px] font-bold text-gray-800 uppercase">Email Address for Employment Letter <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#066aab] outline-none text-sm"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <span className="text-[11px] text-gray-400 mt-1 block">Email</span>
          </div>
          <div>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#066aab] outline-none text-sm"
              value={formData.confirmEmail}
              onChange={e => setFormData({...formData, confirmEmail: e.target.value})}
            />
            <span className="text-[11px] text-gray-400 mt-1 block">Confirm Email</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[14px] font-bold text-gray-800 uppercase">Name <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-2">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#066aab] outline-none text-sm"
              value={formData.firstName}
              onChange={e => setFormData({...formData, firstName: e.target.value})}
            />
            <span className="text-[11px] text-gray-400 mt-1 block">First</span>
          </div>
          <div className="md:col-span-1">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#066aab] outline-none text-sm"
              value={formData.middleName}
              onChange={e => setFormData({...formData, middleName: e.target.value})}
            />
            <span className="text-[11px] text-gray-400 mt-1 block">Middle</span>
          </div>
          <div className="md:col-span-3">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#066aab] outline-none text-sm"
              value={formData.lastName}
              onChange={e => setFormData({...formData, lastName: e.target.value})}
            />
            <span className="text-[11px] text-gray-400 mt-1 block">Last</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[14px] font-bold text-gray-800 uppercase">Date of birth <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-3 gap-4">
          <select className="p-2 border border-gray-300 rounded text-sm bg-white" value={formData.dobDay} onChange={e => setFormData({...formData, dobDay: e.target.value})}>
            <option disabled value="">DD</option>
            {Array.from({length: 31}, (_, i) => <option key={i+1} value={String(i+1)}>{i+1}</option>)}
          </select>
          <select className="p-2 border border-gray-300 rounded text-sm bg-white" value={formData.dobMonth} onChange={e => setFormData({...formData, dobMonth: e.target.value})}>
            <option disabled value="">MM</option>
            {Array.from({length: 12}, (_, i) => <option key={i+1} value={String(i+1)}>{i+1}</option>)}
          </select>
          <select className="p-2 border border-gray-300 rounded text-sm bg-white" value={formData.dobYear} onChange={e => setFormData({...formData, dobYear: e.target.value})}>
            <option disabled value="">YYYY</option>
            {Array.from({length: 100}, (_, i) => <option key={2024-i} value={String(2024-i)}>{2024-i}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[14px] font-bold text-gray-800 uppercase">GENDER <span className="text-red-500">*</span></label>
        <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
          <option>Male</option>
          <option>Female</option>
          <option>Prefer not to say</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[14px] font-bold text-gray-800 uppercase">Phone <span className="text-red-500">*</span></label>
        <input 
          type="tel" 
          placeholder="(999) 999-9999"
          className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#066aab] outline-none text-sm"
          value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
        />
      </div>

      <div className="space-y-3">
        <label className="text-[14px] font-bold text-gray-800 uppercase">Preferred Contact Method <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          {['Email', 'Phone texts', 'Zoom'].map(method => (
            <label key={method} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input 
                type="radio" 
                name="preferredContact" 
                className="w-4 h-4 text-[#066aab]" 
                checked={formData.preferredContact === method}
                onChange={() => setFormData({...formData, preferredContact: method})}
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[14px] font-bold text-gray-800 uppercase">Would you like to be contacted via Phone texts? <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          {['Yes', 'No'].map(opt => (
            <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input 
                type="radio" 
                name="contactViaTexts" 
                className="w-4 h-4 text-[#066aab]" 
                checked={formData.contactViaTexts === opt}
                onChange={() => setFormData({...formData, contactViaTexts: opt})}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormStep1;
