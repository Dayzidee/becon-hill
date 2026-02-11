
import React from 'react';

interface AccordionItemProps {
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  title, 
  icon, 
  isActive, 
  onClick, 
  children 
}) => {
  return (
    <div className="mb-3">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between py-4 px-6 transition-all duration-300 ${
          isActive 
            ? 'bg-[#5b46e0] text-white rounded-[40px] shadow-md' 
            : 'bg-white text-gray-700 border border-gray-100 rounded-[40px] hover:border-[#5b46e0]/20 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center ${isActive ? 'text-white' : 'text-gray-400'}`}>
            <i className={icon + " text-base"}></i>
          </div>
          <span className="text-[15px] font-semibold text-left leading-tight">{title}</span>
        </div>
        
        <div className="flex items-center justify-center">
          {isActive ? (
            <i className="fa-solid fa-minus text-xs"></i>
          ) : (
            <i className="fa-solid fa-plus text-xs"></i>
          )}
        </div>
      </button>

      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-8 pb-6 px-6 bg-white border border-gray-50 rounded-b-[30px] shadow-inner -mt-6 relative z-0">
          <div className="text-gray-500 text-sm leading-relaxed italic space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
