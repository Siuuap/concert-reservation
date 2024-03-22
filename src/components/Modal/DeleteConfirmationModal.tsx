import React from 'react';
import Modal from './Modal';
import deleteIcon from '@/assets/delete.svg';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useTicketContext } from '@/contexts/ticketContext';
interface DeleteConfirmationModalProps {
  isOpen: boolean;
  ticket_id: string;
  concert_name: string;
  onClose: () => void;
  getTickets: () => void;
  handleDeleteTicket: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  ticket_id,
  getTickets,
  handleDeleteTicket,
  concert_name,
}) => {
  const router = useRouter();
  const { tickets, setTickets } = useTicketContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-[300px] sm:w-[442px] gap-[24px] justify-center items-center">
        <Image src={deleteIcon} alt="cancel icon" />
        <p className="text-[#000] font-[700] text-[20px] text-center">
          Are you sure you want to Delete ?
          <br />
          <span className="text-[#000] font-[700] text-[20px] text-center">
            &quot;{concert_name}&quot;
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
            onClick={handleDeleteTicket}
          >
            Yes, Delete
          </button>
        </div>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default DeleteConfirmationModal;
