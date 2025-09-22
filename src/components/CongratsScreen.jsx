import React from 'react';
import Header from './Header';
import { MdMessage } from 'react-icons/md';

const CongratsScreen = () => {
  return (
    <div className="overflow-hidden relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <Header />
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-0">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 px-4 sm:px-6 md:px-8 py-4 lg:ml-16">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 md:mb-8 leading-tight">
              You are all set!
            </h1>
            
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 mb-4 xs:mb-6 sm:mb-8 md:mb-10 leading-relaxed">
              <span className="font-semibold text-gray-800">Emily</span> is ready to start an exciting adventure into<br className="hidden sm:block" />
              the world of tech with JetLearn.
            </p>

            {/* Mobile: Girl Image After Emily Text */}
            <div className="block lg:hidden mb-4 xs:mb-6 sm:mb-8 md:mb-10">
              <div className="w-full flex items-center justify-center relative min-h-[200px] xs:min-h-[250px] sm:min-h-[300px]">
                {/* Main Content */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className="text-center">
                    {/* Girl Image */}
                    <div className="relative inline-block">
                      <img 
                        src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/67371c611162209f4eb93108_thank%20you%20hero%20image.avif"
                        alt="Happy girl with headphones celebrating"
                        className="w-[200px] xs:w-[250px] sm:w-[300px] h-auto relative z-20"
                        style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.08))' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Background SVG Pattern Overlay */}
                <div className="absolute inset-0">
                  <img 
                    src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/6706694ab0057f527def00ec_Contact%20hero%20bg%20img.svg"
                    alt="Background pattern"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Schedule Info Section - Image-like Positioning */}
            <div className="mb-4 xs:mb-6 sm:mb-8 md:mb-10">
              <div className="w-full flex items-center justify-start relative min-h-[150px] xs:min-h-[180px] sm:min-h-[200px]">
                {/* Main Content Container - Similar to Image Container */}
                <div className="relative z-10 flex items-center justify-start w-full">
                  <div className="text-left w-full">
                    {/* Schedule Text Content */}
                    <div className="relative inline-block w-full">
                      <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 xs:mb-4 sm:mb-6 relative z-20">
                        Your class has been scheduled for:
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 xs:gap-4 sm:gap-8 mb-3 xs:mb-4 sm:mb-6 relative z-20">
                        <div className="flex flex-col">
                          <div className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-500 mb-1 xs:mb-2">14 Dec, 2025</div>
                          <div className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-500">8:30 - 9:30 AM EST</div>
                        </div>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 xs:px-6 sm:px-8 py-2 xs:py-2 sm:py-3 rounded-full font-semibold text-sm xs:text-base sm:text-lg transition-colors w-full sm:w-auto relative z-20">
                          Join Now
                        </button>
                      </div>
                      
                      <p className="text-sm sm:text-base text-gray-500 relative z-20">
                        You will receive the details for the class on your registered<br className="hidden sm:block" />
                        email and on WhatsApp.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Optional: Background Pattern Overlay (similar to image background) */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full bg-gradient-to-r from-blue-50 to-green-50 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Invite Friends Section */}
            <div className="bg-gradient-to-r from-blue-400 via-blue-400 to-green-500 rounded-xl xs:rounded-2xl p-4 xs:p-6 sm:p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-white text-xl xs:text-2xl sm:text-3xl font-bold mb-3 xs:mb-4">
                  Invite friends,<br />
                  win rewards
                </h3>
                
                <div className="mt-4 xs:mt-6">
                  <input
                    type="email"
                    placeholder="Enter Email to Invite"
                    className="px-3 xs:px-4 sm:px-5 py-2 xs:py-3 sm:py-4 rounded-lg font-medium text-sm xs:text-base sm:text-lg bg-white w-full sm:w-auto min-w-0 sm:min-w-[300px]"
                  />
                </div>
              </div>
              
              {/* Decorative elements - Referral Design */}
              <div className="absolute right-1 xs:right-2 sm:right-4 top-1 xs:top-2 sm:top-4">
                <img 
                  src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/68bfd8f40c201171a65eff34_Referral%20Website%20Multi-Design%20(7).png"
                  alt="Referral design decoration"
                  className="w-32 h-20 xs:w-40 xs:h-28 sm:w-60 sm:h-40 md:w-72 md:h-52 -translate-y-1 xs:-translate-y-2 sm:-translate-y-4 opacity-60 xs:opacity-80 sm:opacity-100"
                />
              </div>
              
            </div>
          </div>

          {/* Desktop Only: Right Content - Child with Laptop */}
          <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center relative mt-6 xs:mt-8 lg:mt-0 min-h-[250px] xs:min-h-[300px] sm:min-h-[400px] lg:min-h-[600px]">

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="text-center">
                {/* Girl Image */}
                <div className="relative inline-block">
                  <img 
                    src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/67371c611162209f4eb93108_thank%20you%20hero%20image.avif"
                    alt="Happy girl with headphones celebrating"
                    className="w-[250px] xs:w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto relative z-20"
                    style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.08))' }}
                  />
                </div>
              </div>
            </div>

            {/* Background SVG Pattern Overlay */}
            <div className="absolute inset-0">
              <img 
                src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/6706694ab0057f527def00ec_Contact%20hero%20bg%20img.svg"
                alt="Background pattern"
                className="w-full h-full object-contain opacity-50 sm:opacity-75 lg:opacity-100"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Contact Widget */}
        <a 
          href="https://wa.me/919876543210" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-3 xs:bottom-4 sm:bottom-6 right-3 xs:right-4 sm:right-6 bg-white rounded-lg xs:rounded-xl shadow-lg p-2 xs:p-3 sm:p-5 flex items-center gap-2 xs:gap-3 sm:gap-4 max-w-[280px] xs:max-w-xs sm:max-w-sm z-50 hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div className="rounded-full flex items-center justify-center flex-shrink-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 xs:w-8 xs:h-8 sm:w-12 sm:h-12" />
          </div>
          <div className="min-w-0 hidden sm:block">
            <div className="font-semibold text-xs xs:text-sm sm:text-base text-gray-800">Have any queries?</div>
            <div className="text-[10px] xs:text-xs sm:text-sm text-gray-600 leading-tight">
              Reach out to our support team on<br />
              WhatsApp: <span className="cursor-pointer transition-colors">
                +91 98765 43210
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default CongratsScreen;
