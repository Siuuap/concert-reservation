import React from 'react';
import Modal from './Modal';
import checkIcon from '@/assets/check.png';
import Image from 'next/image';

interface ReserveConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ReserveConfirmationModal: React.FC<ReserveConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-[300px] sm:w-[442px] gap-[24px] justify-center items-center">
        <Image src={checkIcon} alt="check icon" width={48} />
        <p className="text-[#000] font-[700] text-[20px] text-center">
          Are you sure you want to Reserve ?
          <br />
          <span className="text-[#000] font-[700] text-[20px] text-center">
            &quot;{`ConcertName 2`}&quot;
          </span>
        </p>
        <div className="flex gap-[16px] w-full">
          <button
            className="border border-solid border-[#C4C4C4] px-4 py-2 bg-[white] rounded-[4px] hover:bg-gray-300 focus:outline-none basis-1/2 text-[#262626] font-[500]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#028A0F] text-white rounded-[4px] focus:outline-none basis-1/2 border border-solid border-[#028A0F] hover:bg-[white] hover:text-[#028A0F] font-[500]"
            onClick={onDelete}
          >
            Yes, Reserve
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReserveConfirmationModal;
