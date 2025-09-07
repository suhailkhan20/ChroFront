// src/pages/AboutUsPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUsPage = () => {
    return (
        <div className="flex flex-col min-h-screen dark:bg-gray-800 text-white font-sans ">
            <main className="flex-grow container mx-auto p-4">
                <div className="max-w-4xl mx-auto my-12 p-8 dark:bg-gray-900 rounded-lg shadow-xl  hover:shadow-gray-950 transition-shadow duration-300">
                    <h1 className="text-4xl font-bold text-center text-amber-700 mb-6">About ChroLog</h1>
                    <p className="text-lg text-center mb-10">
                        Welcome to ChroLog, your personal space for sharing stories, ideas, and knowledge. We believe that everyone has a unique perspective to share, and our platform is designed to make that process simple and meaningful.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl font-semibold text-blue-500 mb-4">Our Vision</h2>
                            <p className="text-gray-300 leading-relaxed">
                                To build a global community where a passion for knowledge-sharing and self-expression is at the forefront. We envision a world where ideas are not just consumed but are part of an ongoing conversation that inspires and educates.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-semibold text-blue-500 mb-4">Our Mission</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Our mission is to empower individuals to share their stories and insights with simplicity and confidence. We are committed to providing a seamless, user-friendly platform that fosters a vibrant and diverse community, promotes creativity, and ensures a safe and welcoming environment where every voice is valued.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AboutUsPage;