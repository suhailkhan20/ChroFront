import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NewPostPage from './pages/NewPostPage';
import PostDetailPage from './pages/PostDetailPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
// import DonatePage from './pages/DonatePage';
import './App.css';

function App() {
  // 1. Create a state to hold the search query
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-800 font-sans">
      {/* 2. Pass the search state and setter to the Header component */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-grow">
        <Routes>
          {/* 3. Pass the search state to the HomePage component */}
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/new-post" element={<NewPostPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          {/* <Route path="/donate" element={<DonatePage />} /> */}
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;