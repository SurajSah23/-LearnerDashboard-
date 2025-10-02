import React, { useState } from 'react';
import instagramIcon from '../assets/instagram.png';
import linkedInIcon from '../assets/linkedIn.png';
import twitterIcon from '../assets/twitter.png';
import facebookIcon from '../assets/facebook.png';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';

const JetLearnFooter = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white">
      {/* Header Section - Fully Responsive */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 sm:ml-4 md:ml-8 lg:ml-16">
        
        {/* Logo and Social Media Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0 mb-8 sm:mb-10 lg:mb-12">
          
          {/* Left side - Logo and Social Icons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto">
            
            {/* Logo */}
            <div className="flex justify-center sm:justify-start">
              <img 
                src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/66de98127f56a0408bef45c8_JetLearn%20Logo.svg" 
                alt="JetLearn Logo" 
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
              />
            </div>
            
            {/* Social Media Icons - Responsive */}
            <div className="flex gap-2 sm:gap-3">
              <a 
                href="https://www.instagram.com/jet_learn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors duration-200"
              >
                <img 
                  src={instagramIcon} 
                  alt="Instagram" 
                  className="w-3 h-3 sm:w-4 sm:h-4 object-contain"
                />
              </a>
              <a 
                href="https://www.linkedin.com/company/jet-learn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors duration-200"
              >
                <img 
                  src={linkedInIcon} 
                  alt="LinkedIn" 
                  className="w-3 h-3 sm:w-4 sm:h-4 object-contain"
                />
              </a>
              <a 
                href="https://x.com/jet_learn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors duration-200"
              >
                <img 
                  src={twitterIcon} 
                  alt="Twitter" 
                  className="w-3 h-3 sm:w-4 sm:h-4 object-contain"
                />
              </a>
              <a 
                href="https://www.facebook.com/jetlearnonline/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors duration-200"
              >
                <img 
                  src={facebookIcon} 
                  alt="Facebook" 
                  className="w-3 h-3 sm:w-4 sm:h-4 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Right side - Certifications - Responsive */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto justify-center lg:justify-end">
            <div className="text-center sm:text-right">
              <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">JetLearn is</p>
              <p className="text-gray-600 text-xs sm:text-sm">certified by</p>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <img 
                src={image1} 
                alt="Education Alliance Finland" 
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 object-contain"
              />
              <img 
                src={image2} 
                alt="HolonIQ Certification" 
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8 sm:mb-10 lg:mb-12 hidden"></div>

        {/* Footer Links Section - Mobile Accordion / Desktop Grid */}
        {/* <div className="block sm:hidden"> */}
          {/* Mobile Accordion View */}
          {/* <div className="space-y-4"> */}
            {/* Courses Section */}
            {/* <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('courses')}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-base font-semibold text-gray-800">Courses</h3>
                <span className="text-gray-600 text-lg">
                  {expandedSections.courses ? '−' : '+'}
                </span>
              </button>
              {expandedSections.courses && (
                <ul className="mt-3 space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Python</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Scratch</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Roblox</a></li>
                </ul>
              )}
            </div> */}

            {/* About JetLearn Section */}
            {/* <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('about')}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-base font-semibold text-gray-800">About JetLearn</h3>
                <span className="text-gray-600 text-lg">
                  {expandedSections.about ? '−' : '+'}
                </span>
              </button>
              {expandedSections.about && (
                <ul className="mt-3 space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Why JetLearn</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">About Us</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Contact Us</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Impact</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Partnerships</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Refer & Earn</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Download Brochure</a></li>
                </ul>
              )}
            </div> */}

            {/* Programs Section */}
            {/* <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('programs')}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-base font-semibold text-gray-800">Programs</h3>
                <span className="text-gray-600 text-lg">
                  {expandedSections.programs ? '−' : '+'}
                </span>
              </button>
              {expandedSections.programs && (
                <div className="mt-3 space-y-4">
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">School of Life</a></li>
                    <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">JetGirls</a></li>
                  </ul>
                  
                  <div>
                    <h4 className="text-base text-gray-600 mb-3">Articles</h4>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Press & Media</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Blogs</a></li>
                    </ul>
                  </div>
                </div>
              )}
            </div> */}

            {/* Articles Section */}
            {/* <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('articles')}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-base font-semibold text-gray-800">Articles</h3>
                <span className="text-gray-600 text-lg">
                  {expandedSections.articles ? '−' : '+'}
                </span>
              </button>
              {expandedSections.articles && (
                <ul className="mt-3 space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Press & Media</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Blogs</a></li>
                </ul>
              )}
            </div> */}

            {/* Careers Section */}
            {/* <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('careers')}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-base font-semibold text-gray-800">Careers</h3>
                <span className="text-gray-600 text-lg">
                  {expandedSections.careers ? '−' : '+'}
                </span>
              </button>
              {expandedSections.careers && (
                <ul className="mt-3 space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Join our Team</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Apply as a Teacher</a></li>
                </ul>
              )}
            </div> */}
          {/* </div> */}
        {/* </div> */}

        {/* Desktop Grid View */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Courses Column */}
          {/* <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Courses</h3>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Python</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Scratch</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Roblox</a></li>
            </ul>
          </div> */}

          {/* About JetLearn Column */}
          {/* <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">About JetLearn</h3>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Why JetLearn</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">About Us</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Contact Us</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Impact</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Partnerships</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Refer & Earn</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Download Brochure</a></li>
            </ul>
          </div> */}

          {/* Programs Column */}
          {/* <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Programs</h3>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-8">
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">School of Life</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">JetGirls</a></li>
            </ul>
            
            <h4 className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">Articles</h4>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Press & Media</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Blogs</a></li>
            </ul>
          </div> */}

          {/* Careers Column */}
          {/* <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Careers</h3>
            <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Join our Team</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-200 block py-1">Apply as a Teacher</a></li>
            </ul>
          </div> */}
        </div>
      </div>

       {/* Bottom Copyright Section - Fully Responsive */}
       <div className="border-t border-gray-200">
         <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            
            {/* Terms and Privacy Links */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 text-center sm:text-left">
              <a href="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/6352c547310233fbe8308cda_Terms%20and%20Conditions.pdf" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">Terms & Conditions</a>
              <a href="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/634cc68d8c5aff79760c961f_JetLearn%20Privacy%20Policy.pdf" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">Privacy Policy</a>
            </div>
            
            {/* Copyright */}
            <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-right">
              © 2025 JetLearn. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JetLearnFooter;
