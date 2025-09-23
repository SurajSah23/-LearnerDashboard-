import React from 'react';
import boyImage from '../assets/boy.png';
import messageIcon from '../assets/messageicon.png';
import videoIcon from '../assets/videoicon.png';
import downloadIcon from '../assets/download.png';

function TrialClassPrep() {
  return (
    <div className="bg-[#EBF7FF] mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-20 rounded-2xl sm:rounded-3xl lg:rounded-4xl">
      <div className="max-w-6xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 md:py-6 lg:py-7 flex flex-col lg:flex-row items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7">
        {/* Left side - Image with blue background */}
        <div className="relative flex-shrink-0">
           
           {/* Main image container */}
           <div className="relative w-[140px] h-[140px] xs:w-[160px] xs:h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] xl:w-[280px] xl:h-[280px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-[#EBF7FF] z-10">
             <img 
               src={boyImage} 
               alt="Student with headphones using laptop" 
               className="w-full h-full object-cover"
             />
           </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight">
          Meanwhile, Stay Prepared for<br className="hidden sm:block" />
          <span className="sm:hidden"> </span>the Trial Class
          </h1>

          <div className="space-y-2 xs:space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
            {/* First bullet point */}
             <div className="flex items-start gap-1 xs:gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-left">
               <div className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center">
                 <img 
                   src={messageIcon} 
                   alt="Message" 
                   className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                 />
               </div>
              <p className="text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg text-gray-700 pt-0.5 xs:pt-0.5 sm:pt-1 md:pt-1 lg:pt-1.5 font-medium">
                The class will be in English.
              </p>
            </div>

            {/* Second bullet point */}
            <div className="flex items-start gap-1 xs:gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-left">
              <div className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center">
                <img 
                  src={videoIcon} 
                  alt="Video" 
                  className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                />
              </div>
              <p className="text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg text-gray-700 pt-0.5 xs:pt-0.5 sm:pt-1 md:pt-1 lg:pt-1.5 font-medium">
                Use a desktop or a laptop with a working<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>camera and microphone.
              </p>
            </div>

            {/* Third bullet point */}
            <div className="flex items-start gap-1 xs:gap-2 sm:gap-2 md:gap-3 lg:gap-4 text-left">
              <div className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center">
                <img 
                  src={downloadIcon} 
                  alt="Download" 
                  className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                />
              </div>
              <p className="text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg text-gray-700 pt-0.5 xs:pt-0.5 sm:pt-1 md:pt-1 lg:pt-1.5 font-medium">
                The class will be conducted via Zoom -<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Please ensure the app is installed on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrialClassPrep;
