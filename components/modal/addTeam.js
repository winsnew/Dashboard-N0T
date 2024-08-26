import { useState } from "react";
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

const AddTeamModal = ({ isOpen, onClose, onProfileAdded }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [stackImages, setStackImages] = useState([]);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleStackImagesChange = (e) => {
    setStackImages(Array.from(e.target.files));
  };

  const resetForm = () => {
    // Reset form fields
    setName('');
    setTitle('');
    setDescription('');
    setProfileImage(null);
    setStackImages([]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
    if (profileImage) {
      formData.append('Images', profileImage);
    }
    stackImages.forEach((file, index) => {
      formData.append('stackImages', file);
    });

    try {
      const response = await axios.post("/api/team", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      console.log("Upload response:", response.data);
      onProfileAdded(response.data.data);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Upload error:", error);  
    } 
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
              <h2 className="text-2xl font-semibold mb-4">Add Data</h2>
              <form onSubmit={handleSubmit} >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    onChange={handleProfileImageChange}
                    className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
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
                    multiple
                    onChange={handleStackImagesChange}
                    className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
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

export default AddTeamModal;
