'use client';
import React from 'react';
import axios from 'axios';
import userIcon from '@/assets/user.svg';
import awardIcon from '@/assets/award.svg';
import cancelIcon from '@/assets/x-circle.svg';
import Image from 'next/image';
import { StatusData } from '@/interface/StatusData';
import { Overview } from '@/interface/Overview';
import { useTicketContext } from '@/contexts/ticketContext';
import { UserTicket } from '@/interface/UserTicket';
const Status: React.FC = () => {
  const { tickets, setTickets } = useTicketContext();
  const [statusData, setStatusData] = React.useState<StatusData | null>(null);

  React.useEffect(() => {
    getTicketStatus();
  }, [tickets]);

  async function getTicketStatus() {
    try {
      const response = await axios.get('http://localhost:4000/tickets');
      const user_ticket = await axios.get('http://localhost:4000/user_tickets');
      const total_seat = response.data.data.reduce(
        (acc: number, item: Overview) => acc + item.total_seat,
        0
      );

      const canceled_seat = user_ticket.data.reduce(
        (acc: number, item: UserTicket) => {
          if (item.status === 'cancel') {
            acc += 1;
          }
          return acc;
        },
        0
      );
      const fetch_reserve_seat = user_ticket.data.reduce(
        (acc: number, item: UserTicket) => {
          if (item.status === 'reserve') {
            acc += 1;
          }
          return acc;
        },
        0
      );
      const reserved_seat = fetch_reserve_seat - canceled_seat;

      console.log(`cancel`, canceled_seat);
      setStatusData({ total_seat, reserved_seat, canceled_seat });
    } catch (error) {
      console.error('Error fetching status data:', error);
    }
  }

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <div className="flex md:flex-col justify-center items-center bg-[#0070A4] min-h-[150px] px-[16px] py-[24px] rounded-xl text-white gap-[10px] 2xl:w-[350px] md:w-1/3">
        <Image src={userIcon} alt="user icon" />
        <p className="text-[24px]">Total of seats</p>
        <p className="text-[30px] sm:text-[60px] text-white ml-auto md:ml-[0]">
          {statusData?.total_seat ?? '-'}
        </p>
      </div>
      <div className="flex md:flex-col justify-center items-center bg-[#00A58B] min-h-[150px] px-[16px] py-[24px] rounded-xl text-white gap-[10px] 2xl:w-[350px] md:w-1/3">
        <Image src={awardIcon} alt="user icon" />
        <p className="text-[24px]">Reserve</p>
        <p className="text-[30px] sm:text-[60px] text-white ml-auto md:ml-[0]">
          {statusData?.reserved_seat ?? '-'}
        </p>
      </div>
      <div className="flex md:flex-col justify-center items-center bg-[#E84E4E] min-h-[150px] px-[16px] py-[24px] rounded-xl text-white gap-[10px] 2xl:w-[350px] md:w-1/3">
        <Image src={cancelIcon} alt="user icon" />
        <p className="text-[24px]">Cancel</p>
        <p className="text-[30px] sm:text-[60px] justify-self-end ml-auto md:ml-[0]">
          {statusData?.canceled_seat ?? '0'}
        </p>
      </div>
    </div>
  );
};

export default Status;
