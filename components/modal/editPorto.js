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

const EditPorto = ({ isEditOpen, onEditClose, onUpdated, porto }) => {
    const [name, setName] = useState(porto?.name || '')
    const [portoImage, setPortoImage] = useState(null)
    const [category, setCategory] = useState(porto?.category || '')
    const [technology, setTechnology] = useState(porto?.technology || '')
    const [description, setDescription] = useState(porto?.description || '')
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (porto) {
            setName(porto.name)
            setCategory(porto.category)
            setTechnology(porto.technology)
            setDescription(porto.description)
        }
    }, [porto])

    const handlePortoImage = (e) => {
        setPortoImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('');
        const token = localStorage.getItem('token')
        const formData = new FormData()
        formData.append('name', name)
        formData.append('category', category)
        formData.append('technology', technology)
        formData.append('description', description)

        if (portoImage) {
            formData.append('Images', portoImage)
        }

        try {
            const response = await axios.put(`/api/porto/${porto._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            onUpdated({...response.data, _id: porto._id })
            onEditClose()
        } catch (error) {
            console.log('error', error)

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
    if (!isEditOpen) return null
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
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        onChange={handlePortoImage}
                                        className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Technology
                                    </label>
                                    <textarea
                                        value={technology}
                                        onChange={(e) => setTechnology(e.target.value)}
                                        className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        rows="4"
                                        required
                                    ></textarea>
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
    )
}

export default EditPorto