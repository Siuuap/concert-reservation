'use client';
import React from 'react';

import checkIcon from '@/assets/check.png';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
interface ReserveConfirmationModalProps {
  params: any;
}

const ReserveConfirmationModal: React.FC<ReserveConfirmationModalProps> = ({
  params,
}) => {
  const searchParams = useSearchParams();
  const user_id = 'f0a90245-416d-46fc-870e-9d93a6dd2051';
  const router = useRouter();
  const ticket_id = params.ticket_id;
  const concert_name = searchParams.get('concert_name');
  async function handleReserve(user_id: string, ticket_id: string) {
    try {
      const response = await axios.post(
        'http://localhost:4000/user_tickets/reserve',
        {
          user_id: user_id,
          ticket_id: ticket_id,
        }
      );
      console.log(response);
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
      router.push('/');
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
    <section className="flex justify-center items-center h-screen w-screen bg-[#000]">
      <div className=" bg-white flex flex-col w-[300px] sm:w-[442px] gap-[24px] justify-center items-center p-6">
        <Image src={checkIcon} alt="check icon" width={48} />
        <p className="text-[#000] font-[700] text-[20px] text-center">
          Are you sure you want to Reserve ?
          <br />
          <span className="text-[#000] font-[700] text-[20px] text-center">
            &quot;{concert_name}&quot;
          </span>
        </p>
        <div className="flex gap-[16px] w-full">
          <button
            className="border border-solid border-[#C4C4C4] px-4 py-2 bg-[white] rounded-[4px] hover:bg-gray-300 focus:outline-none basis-1/2 text-[#262626] font-[500]"
            onClick={() => router.push('/')}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#028A0F] text-white rounded-[4px] focus:outline-none basis-1/2 border border-solid border-[#028A0F] hover:bg-[white] hover:text-[#028A0F] font-[500]"
            onClick={() => handleReserve(user_id, ticket_id)}
          >
            Yes, Reserve
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ReserveConfirmationModal;
