
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://bhsrr.com/wp-content/uploads/2026/01/WhatsApp_Image_2026-01-10_at_11.28.12_PM-removebg-preview.png" 
              alt="Beacon Hill" 
              className="h-14 w-auto"
            />
          </div>
          <nav className="hidden md:flex space-x-8 text-[15px] font-medium text-gray-700">
            <a href="#" className="hover:text-[#066aab] transition-colors">Home</a>
            <a href="#" className="hover:text-[#066aab] transition-colors">About Us</a>
            <a href="#" className="hover:text-[#066aab] transition-colors">Services</a>
            <a href="#" className="hover:text-[#066aab] transition-colors">Hire Talent</a>
            <a href="#" className="hover:text-[#066aab] transition-colors">Contact</a>
          </nav>
          <button 
            onClick={onStart}
            className="bg-[#066aab] text-white px-6 py-2.5 rounded-md font-bold text-sm hover:bg-[#05588f] transition-all transform hover:scale-105"
          >
            Apply Now
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-6">
              Workforce solutions, professional services and people working together
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              Our superb financial technologies make all the difference in connecting you to financial organizations, capital specialists, and investors.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onStart}
                className="bg-[#066aab] text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-[#05588f] transition-all shadow-lg shadow-blue-200"
              >
                Start Application
              </button>
              <button className="bg-white text-[#066aab] border-2 border-[#066aab] px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-all">
                Know More
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://bhsrr.com/wp-content/uploads/2024/03/path-digital-tR0jvlsmCuQ-unsplash-1.png" 
              alt="Working together" 
              className="rounded-2xl shadow-2xl relative z-10 animate-fadeInUp"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block border-l-4 border-[#066aab]">
              <p className="text-3xl font-bold text-[#066aab]">2,000+</p>
              <p className="text-sm text-gray-500 font-medium">Customers Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* DEPTH GROWTH SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 flex gap-4">
             <img src="https://bhsrr.com/wp-content/uploads/2024/03/Mask-Group-9.png" className="w-1/4 rounded-xl shadow-lg" alt="" />
             <img src="https://bhsrr.com/wp-content/uploads/2024/03/Mask-Group-1-3.png" className="w-3/4 rounded-xl shadow-lg" alt="" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Depth. Growth. Alignment.</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A billion-dollar specialized consulting firm focused on project expertise, workforce development, and strategic talent placement. Together, we make impact happen.
            </p>
            <button className="bg-[#066aab] text-white px-8 py-3 rounded-md font-bold hover:bg-[#05588f] transition-all">
              Know More
            </button>
          </div>
        </div>
      </section>

      {/* BASIC INFO SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div>
                 <h5 className="text-[#066aab] font-bold uppercase tracking-widest text-sm mb-4">Basic Info about us</h5>
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Delivering the right talent, exactly when it’s needed.</h2>
              </div>
              <div className="text-gray-600 text-lg leading-relaxed">
                 <p>Our specialists partner closely with your organization, operating as a seamless extension of your HR and project resourcing functions. With access to a broad and diverse talent network, we support thousands of businesses as they navigate evolving workforce demands.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-8 border-t-4 border-[#066aab] bg-white shadow-sm">
                 <h2 className="text-5xl font-black text-[#066aab] mb-2">2,000+</h2>
                 <p className="text-gray-500 font-medium">customers served over the last year.</p>
              </div>
              <div className="p-8 border-t-4 border-[#066aab] bg-white shadow-sm">
                 <h2 className="text-5xl font-black text-[#066aab] mb-2">939,421</h2>
                 <p className="text-gray-500 font-medium">candidate introductions made in the past 5 years.</p>
              </div>
              <div className="p-8 border-t-4 border-[#066aab] bg-white shadow-sm">
                 <h2 className="text-5xl font-black text-[#066aab] mb-2">8/10</h2>
                 <p className="text-gray-500 font-medium">percentage of our clients choose to work with us again.</p>
              </div>
              <div className="p-8 border-t-4 border-[#066aab] bg-white shadow-sm">
                 <h2 className="text-5xl font-black text-[#066aab] mb-2">1,200+</h2>
                 <p className="text-gray-500 font-medium">contract hires converted to perm placement annually.</p>
              </div>
           </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold text-[#066aab] tracking-tighter">939,421</h2>
              <p className="text-gray-500 font-medium">Candidate introductions in 5 years</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold text-[#066aab] tracking-tighter">8/10</h2>
              <p className="text-gray-500 font-medium">Client retention rate</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold text-[#066aab] tracking-tighter">1,200+</h2>
              <p className="text-gray-500 font-medium">Annual perm placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Knowledge & Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a complete suite of workforce solutions, specialized consulting and staffing services across market sectors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Financial', icon: 'fa-coins' },
              { title: 'Healthcare', icon: 'fa-hand-holding-heart' },
              { title: 'Administrative', icon: 'fa-user-tie' },
              { title: 'Human Resources', icon: 'fa-users-gear' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer border border-gray-100">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#066aab] transition-colors">
                  <i className={`fa-solid ${item.icon} text-2xl text-[#066aab] group-hover:text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIND FUTURE SECTION */}
      <section className="py-24 bg-gradient-to-br from-[#066aab] to-[#044a78] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <i className="fa-solid fa-lighthouse text-[400px] -mr-32 -mt-32 rotate-12"></i>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
           <div>
              <h2 className="text-4xl font-bold mb-6">Find your future with us</h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                We are always looking for exceptional talent at all levels – in recruiting, sales, or operations. At Beacon Hill, our success is rooted in our dedication to our people.
              </p>
              <button 
                onClick={onStart}
                className="bg-white text-[#066aab] px-10 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-all flex items-center gap-3"
              >
                Work with us <i className="fa-solid fa-arrow-right"></i>
              </button>
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
                 <h3 className="text-4xl font-black mb-2 text-white">95%</h3>
                 <p className="text-blue-100 text-sm">of leadership has remained with the company since inception.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 mt-12">
                 <h3 className="text-4xl font-black mb-2 text-white">20%</h3>
                 <p className="text-blue-100 text-sm">of all employees have been promoted within the past two years.</p>
              </div>
           </div>
        </div>
      </section>

      {/* LOGO GRID */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-wrap justify-center items-center gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
              <img src="https://bhsrr.com/wp-content/uploads/2026/01/Beacon-Hill-Top-Rated-Company-Outlook-for-2025-150x150.png" className="h-20 w-auto" alt="" />
              <img src="https://bhsrr.com/wp-content/uploads/2026/01/best-of-staffing_2025_talent_diamond-rgb-150x150.png" className="h-20 w-auto" alt="" />
              <img src="https://bhsrr.com/wp-content/uploads/2026/01/best-of-staffing_2025_employee_diamond-rgb-150x150.png" className="h-20 w-auto" alt="" />
              <img src="https://bhsrr.com/wp-content/uploads/2026/01/best-of-staffing_2025_diamond-rgb-150x150.png" className="h-20 w-auto" alt="" />
              <img src="https://bhsrr.com/wp-content/uploads/2026/01/2025-Best-Company-Compensation-150x150.png" className="h-20 w-auto" alt="" />
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <img 
              src="https://bhsrr.com/wp-content/uploads/2026/01/WhatsApp_Image_2026-01-10_at_11.28.12_PM-removebg-preview.png" 
              alt="Logo" 
              className="h-12 brightness-200 grayscale mb-6"
            />
            <p className="text-sm leading-relaxed text-slate-400">
              Beacon Hill Staffing Group is a nationwide workforce solutions firm connecting job seekers with employers across a broad range of industries.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Projects</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Help Center</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for the latest career advice and insights.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-800 border-none rounded-l-md px-4 py-2 w-full focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              />
              <button className="bg-[#066aab] text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          ©2026 Beacon Hill Staffing Group. All Rights Reserved.
        </div>
        
      </footer>
    </div>
  );
};

export default LandingPage;
