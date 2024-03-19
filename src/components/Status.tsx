'use client';
import React from 'react';
import axios from 'axios';
import userIcon from '@/assets/user.svg';
import awardIcon from '@/assets/award.svg';
import cancelIcon from '@/assets/x-circle.svg';
import Image from 'next/image';
import { StatusData } from '@/interface/StatusData';

const Status: React.FC = () => {
  const [statusData, setStatusData] = React.useState<StatusData | null>(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<StatusData>(
        'http://your-nestjs-backend.com/status'
      );
      setStatusData(response.data);
    } catch (error) {
      console.error('Error fetching status data:', error);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row">
      <div className="flex md:flex-col justify-center items-center bg-[#0070A4] min-h-[150px] px-[16px] py-[24px] rounded-xl text-white gap-[10px] 2xl:w-[350px] md:w-1/3">
        <Image src={userIcon} alt="user icon" />
        <p className="text-[24px]">Total of seats</p>
        <p className="text-[30px] sm:text-[60px] text-white ml-auto md:ml-[0]">
          500
        </p>
      </div>
      <div className="flex md:flex-col justify-center items-center bg-[#00A58B] min-h-[150px] px-[16px] py-[24px] rounded-xl text-white gap-[10px] 2xl:w-[350px] md:w-1/3">
        <Image src={awardIcon} alt="user icon" />
        <p className="text-[24px]">Reserve</p>
        <p className="text-[30px] sm:text-[60px] text-white ml-auto md:ml-[0]">
          500
        </p>
      </div>
      <div className="flex md:flex-col justify-center items-center bg-[#E84E4E] min-h-[150px] px-[16px] py-[24px] rounded-xl text-white gap-[10px] 2xl:w-[350px] md:w-1/3">
        <Image src={cancelIcon} alt="user icon" />
        <p className="text-[24px]">Cancel</p>
        <p className="text-[30px] sm:text-[60px] justify-self-end ml-auto md:ml-[0]">
          {statusData?.canceledSeats || '0'}{' '}
        </p>
      </div>
    </div>
  );
};

export default Status;
