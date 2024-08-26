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

const AddPorto = () => {
    
}