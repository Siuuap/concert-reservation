import React from 'react';
import Modal from './Modal';
import deleteIcon from '@/assets/delete.svg';
import Image from 'next/image';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-[300px] sm:w-[442px] gap-[24px] justify-center items-center">
        <Image src={deleteIcon} alt="cancel icon" />
        <p className="text-[#000] font-[700] text-[20px] text-center">
          Are you sure you want to Delete ?
          <br />
          <span className="text-[#000] font-[700] text-[20px] text-center">
            &quot;{`ConcertName 2`}&quot;
          </span>
        </p>

        <div className="flex gap-[16px] w-full">
          <button
            className="border border-solid border-[#C4C4C4] px-4 py-2 bg-[white] rounded-[4px] hover:bg-gray-300 focus:outline-none basis-1/2 text-[#262626]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-[4px] bg-red-500 text-white hover:bg-red-600 focus:outline-none basis-1/2"
            onClick={onDelete}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
