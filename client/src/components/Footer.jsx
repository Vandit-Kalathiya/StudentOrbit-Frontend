import React from 'react';
import { TwitterIcon, FacebookIcon, InstagramIcon, LinkedinIcon, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 px-6 font-poppins">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Brand Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">StudentOrbit</h2>
                    <p className="text-gray-400">
                        Creating digital experiences that inspire and innovate.
                    </p>
                    <div className="flex justify-center sm:justify-start space-x-4">
                        <a href="#" className="hover:text-white transition-colors">
                            <TwitterIcon size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <FacebookIcon size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <InstagramIcon size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <LinkedinIcon size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Contact Info</h3>
                    <div className="space-y-2">
                        <p>Orbit Studio</p>
                        <p>007, The Pilo Wood</p>
                        <p>Adelaide, S2 8GY</p>
                        <p>Email: info@studentorbit.com</p>
                        <p>Phone: +91 1234567890</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">More Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/f/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Have Questions</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">About Minimal</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy & Policies</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQ's</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-center md:justify-between items-center">
                <p className="text-sm text-gray-400">© {new Date().getFullYear()} StudentOrbit. All Rights Reserved</p>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors mt-4 md:mt-0">
                    Have a Good Day
                </a>
            </div>
        </footer>
    );
};

export default Footer;
