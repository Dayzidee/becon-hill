
import React from 'react';
import { ApplicationData } from '../types';

interface Props {
  formData: ApplicationData;
  setFormData: (data: ApplicationData) => void;
}

const FormStep4: React.FC<Props> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="space-y-4">
        <label className="text-[14px] font-bold text-gray-800 uppercase tracking-tight">Preferred Payment Method <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['Direct Deposit', 'Check'].map(method => (
            <label
              key={method}
              className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === method
                  ? 'border-[#066aab] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                className="w-5 h-5 text-[#066aab] focus:ring-[#066aab]"
                checked={formData.paymentMethod === method}
                onChange={() => setFormData({ ...formData, paymentMethod: method })}
              />
              <span className="text-sm font-medium text-gray-700">{method}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[14px] font-bold text-gray-800 uppercase tracking-tight">Authorization <span className="text-red-500">*</span></label>
        <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:border-gray-300 transition-all">
          <input
            type="checkbox"
            className="mt-1 w-5 h-5 text-[#066aab] border-gray-300 rounded focus:ring-[#066aab]"
            checked={formData.authorized}
            onChange={e => setFormData({ ...formData, authorized: e.target.checked })}
          />
          <span className="text-sm text-gray-600 leading-relaxed italic">
            I authorize Beacon Hill Staffing Group to issue my payments using my selected payment method. This authorization will remain active until I provide written notice of any changes or cancellation.
          </span>
        </label>
      </div>
    </div>
  );
};

export default FormStep4;
