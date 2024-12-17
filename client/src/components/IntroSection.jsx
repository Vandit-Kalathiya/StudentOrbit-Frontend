import React from 'react';
import ceo from '../assets/ceo.png'; // You can replace this with an image of the StudentOrbit founder or a relevant image for your project

const IntroSection = () => {
    return (
        <section className="py-16 px-8 font-poppins">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-4">
                        Empowering Student Projects
                    </h2>
                    <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        StudentOrbit is designed to enhance the student experience by providing a platform that facilitates efficient project management, weekly planning, and seamless collaboration.
                    </p>
                </div>

                {/* Testimonial/Feature Section */}
                <div className="grid md:grid-cols-2 gap-8 items-center mt-20">
                    {/* Image Column */}
                    <div className="relative">
                        <img
                            src={ceo} // Replace with an image of your project or the founder
                            alt="Founder portrait"
                            className="w-70 max-w-md mx-auto h-80"
                        />
                    </div>

                    {/* Content Column */}
                    <div className="max-w-lg">
                        <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-6" style={{ fontFamily: '"Poppins", sans-serif' }}>
                            Efficient, Collaborative, and Innovative<br />
                            Project Management for Students
                        </h3>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            StudentOrbit provides students with an intuitive platform to manage their group projects, set weekly goals, track progress, and collaborate effectively with teammates and instructors.
                        </p>

                        {/* Author Info */}
                        <div className="space-y-2">
                            <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                                DARK TECHIE {/* Replace with the actual name of the founder */}
                            </h4>
                            <p className="text-gray-600">Founder - StudentOrbit</p>

                            {/* Signature */}
                            <div className="mt-4">
                                <svg
                                    viewBox="0 0 100 40"
                                    className="w-32 h-12 text-gray-900"
                                >
                                    <path
                                        d="M10 20C10 20 20 5 30 20C40 35 50 20 60 20C70 20 80 35 90 20"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="signature-path"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntroSection;
