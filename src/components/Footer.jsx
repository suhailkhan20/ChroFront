// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">About ChroLog</h3>
            <p className="text-lg leading-relaxed">
              ChroLog is a personal space for sharing stories, ideas, and knowledge. Our platform empowers you to create and discover a wide range of content, fostering a community of passionate writers and engaged readers.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-lg hover:text-white transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="/about-us" className="text-lg hover:text-white transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-lg hover:text-white transition-colors duration-200">Contact</a>
              </li>
              <li>
                <a href="/new-post" className="text-lg hover:text-white transition-colors duration-200">New Post</a>
              </li>
              {/* <li>
                <a href="/donate" className="text-sm hover:text-white transition-colors duration-200">Donate</a>
              </li> */}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <div className="text-sm space-y-2">
              <p>Email: suhailkhan2k5p@gmail.com</p>
              <p>Greater Noida, Uttar Pradesh, India</p>
              <div className="flex space-x-4 mt-2">
                <a href="https://www.linkedin.com/in/suhail-khan-721204278?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                  <FaLinkedin size={20} />
                </a>
                <a href="https://github.com/suhailkhan20?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <FaGithub size={20} />
                </a>
                {/* <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                  <FaYoutube size={20} />
                </a> */}
                <a href="https://www.instagram.com/suhail_khan__20?igsh=aG9uc3k3eDRicm5y" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} My Blog. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;