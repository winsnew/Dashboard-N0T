import axios from "../../lib/axios";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const DeletePorto = ({ isDeleteOpen, onDeleteClose, portoId, onDeleteSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
  
    const handleDelete = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`/api/porto/${portoId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        onDeleteSuccess(portoId);
        onDeleteClose();
      } catch (error) {
        console.error("Error deleting porto:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (!isDeleteOpen) return null;
    return (
      <AnimatePresence>
        {isDeleteOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={onDeleteClose}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-semibold mb-4">Add Data</h2>
                  <p>Are You Sure to Delete This Item ?</p>
                  <div className="flex flex-row">
                    <button onClick={onDeleteClose}>Cancel</button>
                    <button onClick={handleDelete} >Delete</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };
  
  export default DeletePorto;