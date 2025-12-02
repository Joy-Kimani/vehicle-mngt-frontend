import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const AnimatedModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Box */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            {title && (
              <div className="p-4 border-b bg-white sticky top-0 z-20">
                <h2 className="text-xl font-semibold">{title}</h2>
              </div>
            )}

            {/* Body */}
            <div
              className="p-4 overflow-y-auto text-black"
              style={{ maxHeight: "calc(90vh - 140px)" }}
            >
              {children}
            </div>

            {/* Footer */}
            <div className="p-4 border-t sticky bottom-0 bg-white">
              <button
                onClick={onClose}
                className="w-full p-3 bg-red-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
