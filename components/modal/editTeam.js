import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "../../lib/axios";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const editTeamModal = ({ isEditOpen, onEditClose, onUpdate, profile }) => {
  const [name, setName] = useState(profile?.name || '');
  const [profileImage, setProfileImage] = useState(null);
  const [title, setTitle] = useState(profile?.title || '');
  const [description, setDescription] = useState(profile?.description || '');
  const [stackImages, setStackImages] = useState(profile?.stackImages || []);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setTitle(profile.title);
      setDescription(profile.description);
      setStackImages(profile.stackImages || []);
    }
  }, [profile]);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  }

  const handleStackImagesChange = (e) => {
    setStackImages(e.target.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    console.log("Profile ID: ", profile._id)
    const token = localStorage.getItem('token');
    const formData = new FormData()
    formData.append('name', name)
    formData.append('title', title)
    formData.append('description', description)
    if (profileImage) {
      formData.append('Images', profileImage)
    }
    Array.from(stackImages).forEach((file) => {
      formData.append('stackImages', (file))
    })

    try {
      const response = await axios.put(`/api/team/${profile._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpdate({...response.data, _id: profile._id})
      onEditClose()
    } catch (error) {
      console.log('Error updating member team', error)

      // Set specific error message based on error type
      if (error.response) {
        // Errors from the server
        setErrorMessage(error.response.data.message || 'An error occurred while updating the team member.');
      } else if (error.request) {
        // Errors related to the request but no response
        setErrorMessage('No response from the server. Please try again later.');
      } else {
        // General errors
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  }

  if (!isEditOpen) return null;

  return (
    <AnimatePresence>
      {isEditOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onEditClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
              <h2 className="text-2xl font-semibold mb-4">Edit Data</h2>
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="mb-4 text-red-500 text-sm">
                    {errorMessage}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={handleProfileImageChange}
                    className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Stack Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleStackImagesChange}
                    className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onEditClose}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default editTeamModal;
