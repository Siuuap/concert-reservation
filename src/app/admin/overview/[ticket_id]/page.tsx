'use client';
import React from 'react';
import deleteIcon from '@/assets/delete.svg';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useTicketContext } from '@/contexts/ticketContext';
import { useSearchParams } from 'next/navigation';
interface DeleteConfirmationModalProps {
  getTickets: () => void;
  ticket_id: string;
  params: any;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  ticket_id,
  getTickets,
  params,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const concert_name = searchParams.get('concert_name');
  const id = params.ticket_id;

  async function onDelete(ticket_id: string): Promise<void> {
    try {
      const response = await axios.delete(
        `http://localhost:4000/tickets/${id}`
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
      router.push('/admin/overview');
    } catch (error) {
      console.log(`error from axios`);
      toast.error('Fail to delete ticket', {
        position: 'top-right',
        autoClose: 900,
        hideProgressBar: true,
        style: {
          backgroundColor: '#fed2d2',
          color: '#b30000',
        },
      });
    }
  }
  return (
    <section className="flex justify-center items-center h-screen w-screen bg-[#000]">
      <div className="bg-[#fff] flex flex-col w-[300px] sm:w-[442px] gap-[24px] justify-center items-center p-6">
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
            onClick={() => {
              router.push(`/admin/overview`);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-[4px] bg-red-500 text-white hover:bg-red-600 focus:outline-none basis-1/2"
            onClick={() => onDelete(ticket_id)}
          >
            Yes, Delete
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default DeleteConfirmationModal;
