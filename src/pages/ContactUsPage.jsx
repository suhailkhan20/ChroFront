// src/pages/ContactUsPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://chrolog.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' }); // Clear the form
            } else {
                alert(data.message || 'Error sending message.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen dark:bg-gray-800 text-gray-300 font-sans ">
            <main className="flex-grow container mx-auto p-4">
                <div className="max-w-xl mx-auto my-12 p-8 dark:bg-gray-900 rounded-lg shadow-xl hover:shadow-gray-950 transition-shadow duration-300">
                    <h1 className="text-4xl font-bold text-center text-amber-700 mb-6">Contact Us</h1>
                    <p className="text-lg text-center mb-10">
                        Have a question or want to get in touch? Fill out the form below.
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block  font-medium text-gray-500 text-2xl">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block  font-medium text-gray-500 text-2xl">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block font-medium text-gray-500 text-2xl">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-6 py-3 border w-full border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ContactUsPage;
