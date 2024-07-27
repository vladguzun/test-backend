import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
}

const Modal: React.FC<ModalProps> = ({ children, isVisible, onClose, width = "40vw", height = "70vh" }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <motion.div
        className={`bg-slate-700 p-6 rounded shadow-lg overflow-auto w-[${width}] h-[${height}]`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        {children}
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded ml-2 mt-4">Close</button>
      </motion.div>
    </div>
  );
};

export default Modal;
