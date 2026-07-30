import { useEffect } from 'react';
import useStore from '../store';

const Profile = () => {
  const { userProfile, fetchUserProfile, loading, error } = useStore();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <div>
      <h2>User Profile</h2>
      {loading && <p>Loading profile...</p>}
      {error && <p>Error: {error}</p>}
      {userProfile && (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
