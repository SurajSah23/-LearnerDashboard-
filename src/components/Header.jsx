import React from 'react';

const Header = ({ showTagline = false }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center relative sm:ml-4 md:ml-8 lg:ml-16">
        <img 
          src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/62d8b4ad5ba81463b1973e7e_Logo.svg" 
          alt="JET Learn Logo" 
          className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 object-contain"
        />
      </div>
      {showTagline && (
        <div className="flex flex-col">
          <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">World's Top Rated</div>
          <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">AI Academy for Kids</div>
        </div>
      )}
    </div>
  );
};

export default Header;