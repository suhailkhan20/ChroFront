// // src/pages/DonatePage.jsx
// import React from 'react';
// import upiQrCode from '../assets/QR.jpg'; // Place your QR code image in the 'src/assets' folder

// const DonatePage = () => {
//     return (
//         <div className="flex flex-col min-h-screen dark:bg-gray-800 text-white font-sans">
//             <main className="flex-grow container mx-auto px-4 md:px-8 py-12">
//                 <div className="max-w-4xl mx-auto my-12 p-8 dark:bg-gray-900 rounded-lg shadow-xl">
//                     <div className="text-center mb-10">
//                         <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">Become a Supporter</h1>
//                         <p className="text-lg text-gray-300 max-w-2xl mx-auto">
//                             ChroLog is a passion project dedicated to helping individuals share their knowledge freely. If you find our platform useful, please consider supporting us. Your contribution, no matter the size, makes a huge difference!
//                         </p>
//                     </div>

//                     <div className="mb-12">
//                         <h2 className="text-3xl font-semibold text-center text-amber-500 mb-6">How Your Support Helps ChroLog</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//                             <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
//                                 <h3 className="text-2xl font-bold mb-2 text-white">Server Costs</h3>
//                                 <p className="text-gray-400">Keeps the website online, fast, and accessible to everyone 24/7.</p>
//                             </div>
//                             <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
//                                 <h3 className="text-2xl font-bold mb-2 text-white">New Features</h3>
//                                 <p className="text-gray-400">Allows for the development of new tools and improvements to the platform.</p>
//                             </div>
//                             <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
//                                 <h3 className="text-2xl font-bold mb-2 text-white">Ad-Free Experience</h3>
//                                 <p className="text-gray-400">Ensures the platform remains clean, focused, and free of advertisements.</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="text-center">
//                         <h2 className="text-3xl font-semibold text-blue-500 mb-6">Ways to Contribute</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                             <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
//                                 <h3 className="text-xl font-bold mb-4 text-white">UPI (for users in India)</h3>
//                                 <div className="flex flex-col items-center">
//                                     <img src={upiQrCode} alt="UPI QR Code" className="w-48 h-48 mb-4 rounded-lg" />
//                                     <p className="text-sm text-gray-400">Scan the QR code with any UPI app like Google Pay, PhonePe, or Paytm.</p>
//                                     <p className="text-lg font-bold text-gray-300 mt-2">UPI ID : 8700696101-2@ybl</p>
//                                 </div>
//                             </div>
//                             <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
//                                 <h3 className="text-xl font-bold mb-4 text-white">Buy Me a Coffee</h3>
//                                 <p className="text-sm text-gray-400 mb-4">Support my work and help keep ChroLog ad-free.</p>
//                                 <button
//                                     onClick={() => window.open('YOUR_BUY_ME_A_COFFEE_LINK', '_blank')}
//                                     className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                                 >
//                                     Buy Me a Coffee
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default DonatePage;