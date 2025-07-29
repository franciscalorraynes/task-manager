import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Desenvolvido com</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm font-medium">por</span>
          </div>
          <div className="text-lg font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
            Francisca Lorrayne
          </div>
          <div className="text-xs text-blue-100 opacity-80">
            Sistemas Distribuídos • {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;