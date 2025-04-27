import React, { useEffect, useRef } from 'react';
import './Modals.css';

interface ModalProps {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disableClickOutsideClose?: boolean;
}

function GeneralModal({ children, setIsOpen, disableClickOutsideClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // to close modal if user click outside the box
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // If the modal is open and the clicked target is not within the modal,
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    !disableClickOutsideClose && document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [disableClickOutsideClose, setIsOpen]);

  return (
    <div className='modalContainer'>
      <div className='modal' ref={modalRef}>
        {children}
      </div>
    </div>
  );
}

export default GeneralModal;
