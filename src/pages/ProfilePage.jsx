import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const [profile, setProfile] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            setLoggedInUser(user);

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                if (id) {
                    // Fetch profile by ID for other users
                    const profileResponse = await fetch(`http://localhost:5020/api/users/${id}`);
                    if (!profileResponse.ok) {
                        throw new Error('Profile not found.');
                    }
                    const profileData = await profileResponse.json();
                    setProfile(profileData);
                } else {
                    // Fetch logged-in user's own profile
                    const profileResponse = await fetch('http://localhost:5020/api/users/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (!profileResponse.ok) {
                        throw new Error('Failed to fetch user profile.');
                    }
                    const profileData = await profileResponse.json();
                    setProfile(profileData);
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setProfile(null);
            }
            setLoading(false);
        };

        fetchProfileData();
    }, [id]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('profile', file);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5020/api/users/upload-photo', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                alert('Profile photo updated successfully!');
                // Update the state with the new profile picture URL
                setProfile({ ...profile, profilePicture: data.profilePicture });
            } else {
                alert(data.message || 'Failed to upload photo.');
            }
        } catch (error) {
            console.error('Photo upload error:', error);
            alert('An error occurred during photo upload.');
        }
    };

    const handleProfilePhotoClick = () => {
        // Trigger the hidden file input
        fileInputRef.current.click();
    };

    if (loading) {
        return <div className="text-center mt-8">Loading profile...</div>;
    }

    if (!profile) {
        return <div className="text-center mt-8">Profile not found.</div>;
    }
    
    // Check if the profile being viewed belongs to the logged-in user
    const isOwnProfile = loggedInUser && loggedInUser._id === profile._id;

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="dark:bg-gray-900 hover:shadow-gray-950 transition-shadow duration-300 p-6 rounded-lg shadow-md mb-6 flex items-center space-x-6">
                {/* Profile Photo Section */}
                <div 
                    className="w-20 h-20 rounded-full dark:bg-gray-600 overflow-hidden relative cursor-pointer"
                    onClick={isOwnProfile ? handleProfilePhotoClick : null}
                >
                    {profile.profilePicture ? (
                        <img 
                            src={`http://localhost:5020${profile.profilePicture}`} 
                            alt="Profile" 
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                            {profile.firstname ? profile.firstname.charAt(0).toUpperCase() : ''}{profile.lastname ? profile.lastname.charAt(0).toUpperCase() : ''}
                        </div>
                    )}
                </div>

                {/* Hidden file input */}
                <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }} 
                />

                {/* User Info */}
                <div>
                    <h1 className="text-2xl font-bold text-white">{profile.firstname} {profile.lastname}</h1>
                    <p className="text-gray-600">{profile.email}</p>
                </div>
            </div>

            {/* <h2 className="text-2xl font-bold mb-4">Uploaded Posts</h2> */}
            {/* <p className="text-gray-600">This feature is not yet implemented for other users.</p> */}
        </div>
    );
};

export default ProfilePage;

