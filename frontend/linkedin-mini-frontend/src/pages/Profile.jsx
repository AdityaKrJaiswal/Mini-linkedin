import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import PostCard from '../components/PostCard';

const Profile = () => {
  const { id } = useParams(); // user id from URL
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setProfile(res.data.user);
      setPosts(res.data.posts);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  if (!profile) return <p className="text-center mt-10 text-red-500">User not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
      <p className="text-gray-600 mb-4">{profile.bio || 'No bio available.'}</p>
      <h2 className="text-2xl font-semibold mb-4">Posts</h2>
      {posts.length === 0 ? (
        <p>This user has not posted anything yet.</p>
      ) : (
        posts.map(post => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Profile;
