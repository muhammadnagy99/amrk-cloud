import React from "react";

interface OverlayProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null; 

  return (
    <div className="fixed inset-0 z-[1000] flex justify-center items-center">
      <div
        className="absolute inset-0 opacity-50"
        onClick={onClose} 
      ></div>

      <div
        className="relative bg-white p-6 rounded-lg shadow-[0_0_20px_0_rgba(0,0,0,0.1)] z-60 w-[90%] max-w-[400px]"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}    
        <button
          onClick={onClose} 
          className="absolute top-4 right-4"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
              fill="#B0438A"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Overlay;
