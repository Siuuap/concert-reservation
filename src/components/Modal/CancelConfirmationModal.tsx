import React from 'react';
import Modal from './Modal';
import deleteIcon from '@/assets/delete.svg';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
interface CancelConfirmationModalProp {
  isOpen: boolean;
  onClose: () => void;
  user_id: string;
  ticket_id: string;
}

const CancelConfirmationModal: React.FC<CancelConfirmationModalProp> = ({
  isOpen,
  onClose,
  user_id,
  ticket_id,
}) => {
  async function handleCancel(user_id: string, ticket_id: string) {
    try {
      const response = await axios.post(
        'http://localhost:4000/user_tickets/cancel',
        {
          user_id: user_id,
          ticket_id: ticket_id,
        }
      );
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 900,
        hideProgressBar: true,
        style: {
          backgroundColor: '#D0E7D2',
          color: '#2B2B2B',
          padding: '16px 6px',
        },
      });
      onClose();
    } catch (error) {
      toast.error('Fail to reserve ticket', {
        position: 'top-right',
        autoClose: 900,
        hideProgressBar: true,
        style: {
          backgroundColor: '#fed2d2',
          color: '#b30000',
        },
      });
      console.log(error);
    }
  }
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
            onClick={() => handleCancel(user_id, ticket_id)}
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelConfirmationModal;
