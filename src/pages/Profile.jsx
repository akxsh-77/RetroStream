import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { auth, db } from '../firebase';
import { updateProfile, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || 'N/A');
      setEmail(currentUser.email || 'N/A');
      setNewDisplayName(currentUser.displayName || '');
    }
  }, [currentUser]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (currentUser && newDisplayName !== currentUser.displayName) {
      try {
        await updateProfile(currentUser, { displayName: newDisplayName });
        // Also update in Firestore if you have a users collection
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, { displayName: newDisplayName }, { merge: true });
        setDisplayName(newDisplayName);
        setMessage('Profile updated successfully!');
      } catch (err) {
        setError('Failed to update profile: ' + err.message);
      }
    } else {
      setMessage('No changes to update.');
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!password) {
      setError('Please enter your password to confirm deletion.');
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, password);
      await reauthenticateWithCredential(currentUser, credential);
      await deleteUser(currentUser);
      setMessage('Account deleted successfully. Redirecting to home...');
      navigate('/');
    } catch (err) {
      setError('Failed to delete account: ' + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (err) {
      setError('Failed to log out: ' + err.message);
    }
  };

  if (!currentUser) {
    return <div className="text-white text-center mt-10">Please log in to view your profile.</div>;
  }

  return (
  <div className="min-h-screen flex justify-center items-center bg-black p-6">
    <div className="bg-surface rounded-xl shadow-netflix p-10 max-w-lg w-full text-text border border-gray-800">
      
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>

      {/* MESSAGES */}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {message && <p className="text-green-500 mb-4 text-center">{message}</p>}

      {/* AVATAR + USER INFO */}
      <div className="flex flex-col items-center mb-8">
        <img 
          src="/userprofile.jpg"
          alt="User Avatar"
          className="w-24 h-24 rounded-full mb-4 object-cover border border-gray-700 shadow-md"
        />
        <p className="text-2xl font-semibold">{displayName}</p>
        <p className="text-text-secondary text-sm">{email}</p>
      </div>

      {/* EDIT NAME FORM */}
      <form onSubmit={handleUpdateProfile} className="space-y-4 mb-8">
        <div>
          <label className="text-sm text-text-secondary block mb-1">Edit Name</label>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-700 text-white focus:ring-primary outline-none"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-primary hover:bg-primary-hover rounded-md text-text font-semibold transition"
        >
          Update Name
        </button>
      </form>

      {/* LOGOUT + DELETE */}
      <div className="space-y-3">
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-text font-semibold transition"
        >
          Logout
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition"
        >
          Delete Account
        </button>
      </div>

      {/* DELETE ACCOUNT CONFIRMATION */}
      {showDeleteConfirm && (
        <div className="mt-6 p-5 rounded-lg bg-neutral-900 border border-red-700">
          <p className="text-red-400 text-sm mb-4">
            This action is permanent. Enter your password to confirm.
          </p>

          <form onSubmit={handleDeleteAccount} className="space-y-4">
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-700 text-white focus:ring-red-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition"
              >
                Confirm
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  </div>
);
};
export default Profile;
