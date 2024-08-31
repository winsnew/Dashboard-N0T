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

const AddPorto = ({ isOpen, onClose, onPortoAdded }) => {
    const [name, setName] = useState('');
    const [portoImage, setPortoImage] = useState(null)
    const [category, setCategory] = useState('')
    const [technology, setTech] = useState('')
    const [description, setDesc] = useState('')

    const handleImageChange = (e) => {
        setPortoImage(e.target.files[0])
    }

    const resetForm = () => {
        setName(''),
        setPortoImage(null)
        setCategory('')
        setTech('')
        setDesc('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        const formData = new FormData()
        formData.append('name', name)
        formData.append('category', category)
        formData.append('technology', technology)
        formData.append('description', description)
        if(portoImage) {
            formData.append('Images', portoImage)
        }
        try {
            const response = await axios.post('/api/porto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                  }
            })
            onPortoAdded(response.data.data)
            resetForm()
            onClose()
        } catch (error) {
            console.error("Upload error:", error);
        }
    }


    if(!isOpen) return null;

    return (
        <>
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
                                            onChange={handleImageChange}
                                            className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            required
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
                                            Tech
                                        </label>
                                        <input
                                        value={technology}
                                        onChange={(e) => setTech(e.target.value)}
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
                                            onChange={(e) => setDesc(e.target.value)}
                                            className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            rows="4"
                                            required
                                        ></textarea>
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
        </>
    )

}

export default AddPorto