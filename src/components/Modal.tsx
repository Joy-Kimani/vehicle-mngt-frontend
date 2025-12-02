import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="
          bg-white rounded-xl shadow-xl w-full max-w-lg 
          max-h-[90vh] relative animate-fadeIn
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        {title && (
          <div className="p-4 border-b sticky top-0 bg-white z-20">
            <h2 className="text-xl font-semibold text-black">{title}</h2>
          </div>
        )}

        {/* body*/}
        <div className="p-4 overflow-y-auto text-black" style={{ maxHeight: "calc(90vh - 140px)" }}>
          {children}
        </div>

        {/* footer */}
        <div className="p-4 border-t bg-white sticky bottom-0 z-20">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
