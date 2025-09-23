import React from 'react';
import arglassesImage from '../assets/arglasses.png';
import separateLogoImage from '../assets/separatelogo.png';
import teacherImage from '../assets/teacher.png';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';

function JetLearnBenefits() {
  return (
    <div className="bg-gray-50 mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-20 rounded-2xl sm:rounded-3xl lg:rounded-4xl lg:mt-2 xl:mt-4 xs:mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16 xl:mt-8">
        {/* Main Heading */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-800 leading-tight px-2 sm:px-0">
            See why JetLearn is the Perfect<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Choice for your Child's Path
          </h1>
        </div>

        {/* Three Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-stretch">
          {/* Left Card - AI First Approach */}
          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 relative overflow-hidden">
              <img
                src={arglassesImage}
                alt="Background image"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-purple-600/20"></div>
            </div>
            <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 text-center flex-grow">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 leading-tight">
                We have an AI First Approach
              </h3>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 leading-relaxed">
                AI is revolutionising every industry, driving innovation and efficiency. AI early equips children with critical skills for success in a tech-driven world.
              </p>
            </div>
          </div>

          {/* Middle Card - Global Accreditations */}
          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 relative overflow-hidden">
              <img
                src={separateLogoImage}
                alt="Background image"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-orange-600/20"></div>
            </div>
            <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 text-center flex-grow">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 leading-tight">
                Our Global Accreditations
              </h3>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 leading-relaxed">
                JetLearn is certified by STEM & Education Alliance Finland, and ranked in the Top 5 in the "STEM for Kids" category by HolonIQ.
              </p>
            </div>
          </div>

          {/* Right Card - Top 1% Educators */}
          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:col-span-2 lg:col-span-1">
            <div className="h-40 xs:h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 relative overflow-hidden">
              <img
                src={teacherImage}
                alt="Background image"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-cyan-600/20"></div>
            </div>
            <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 text-center flex-grow">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 leading-tight">
                We have the Top 1% Educators
              </h3>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 leading-relaxed">
                We have the best teachers on board with advanced degrees, and we match your responses to shortlist the best teacher for your child's tech journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JetLearnBenefits;
