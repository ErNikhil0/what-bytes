'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-400 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-blue-100">
              &copy; {currentYear} Whatbytes. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              href="#" 
              className="text-blue-100 hover:text-white transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </Link>
            <Link 
              href="#" 
              className="text-blue-100 hover:text-white transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter size={22} />
            </Link>
            <Link 
              href="#" 
              className="text-blue-100 hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </Link>
            <Link 
              href="#" 
              className="text-blue-100 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-500/30">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
            <Link 
              href="/about" 
              className="text-blue-100 hover:text-white text-sm transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="text-blue-100 hover:text-white text-sm transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/privacy" 
              className="text-blue-100 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-blue-100 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}