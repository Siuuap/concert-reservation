'use client';
import React from 'react';
import { Ticket } from '@/interface/Ticket';
import axios from 'axios';
import Image from 'next/image';
import saveIcon from '@/assets/save.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
const CreateForm: () => React.ReactElement = () => {
  const router = useRouter();
  const [concertName, setConcertName] = React.useState<string>('');
  const [totalNumberOfSeat, setTotalNumberOfSeat] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string>('');

  const [concertNameStatus, setConcertNameStatus] = React.useState<string>('');
  const [totalNumberOfSeatStatus, setTotalNumberOfSeatStatus] =
    React.useState<string>('');
  const [descriptionStatus, setDescriptionStatus] = React.useState<string>('');
  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setConcertNameStatus('');
    setTotalNumberOfSeatStatus('');
    setDescriptionStatus('');
    if (!concertName || !totalNumberOfSeat || !description) {
      if (!concertName) {
        setConcertNameStatus('Cannot be blank');
      }
      if (!totalNumberOfSeat) {
        setTotalNumberOfSeatStatus('Cannot be blank');
      }
      if (!description) {
        setDescriptionStatus('Cannot be blank');
      }
      toast.error('Fail to create ticket', {
        position: 'top-right',
        autoClose: 900,
        hideProgressBar: true,
        style: {
          backgroundColor: '#fed2d2',
          color: '#b30000',
        },
      });
      return;
    }

    const ticket: Ticket = {
      concert_name: concertName,
      total_seat: totalNumberOfSeat,
      description: description,
    };
    try {
      const response = await axios.post(
        'http://localhost:4000/tickets',
        ticket
      );
      console.log(`response:`, response);
      toast.success('Create successfully', {
        position: 'top-right',
        autoClose: 900,
        hideProgressBar: true,
        style: {
          backgroundColor: '#D0E7D2',
          color: '#2B2B2B',
          padding: '16px 6px',
        },
      });
      console.log(`ticket`, ticket);
      router.push(`/admin/overview`);
    } catch (error) {
      console.log(`error from axios`, error);
      toast.error('Fail to create ticket', {
        position: 'top-right',
        autoClose: 900,
        hideProgressBar: true,
        style: {
          backgroundColor: '#fed2d2',
          color: '#b30000',
          padding: '16px 6px',
        },
      });
    }
  };

  return (
    <form
      className="w-full flex flex-col p-[16px] 2xl:p-[40px] gap-[30px] border border-solid border-[#C2C2C2] rounded-[8px]"
      onSubmit={handleSubmit}
    >
      <h2 className="text-[#1692EC] text-[40px] font-[600] border-b border-solid border-b-[#C2C2C2] pb-[24px]">
        Create
      </h2>
      <div className="flex flex-col lg:flex-row items-center lg:my-[24px] gap-[30px] lg:gap-[24px]">
        <div className="flex flex-col gap-[16px] w-full 2xl:w-[50%] relative">
          <label
            htmlFor="concertName"
            className="text-[#000] text-[24px] font-[400]"
          >
            Concert Name
          </label>
          <input
            id="concertName"
            name="concertName"
            type="text"
            className={`border border-solid outline-none px-[16px] py-[12px] rounded-[4px] text-[16px] ${
              concertNameStatus ? `border-[red]` : `border-[#5C5C5C]`
            }`}
            value={concertName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConcertName(e.target.value)
            }
          />
          {concertNameStatus ? (
            <p className="absolute top-[105px] text-[red]">
              {concertNameStatus}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-[16px] w-full 2xl:w-[50%] relative">
          <label
            htmlFor="totalNumberOfSeat"
            className="text-[#000] text-[24px] font-[400] lg:w-[50%]"
          >
            Total of seat
          </label>
          <input
            id="totalNumberOfSeat"
            name="totalNumberOfSeat"
            type="number"
            className={`border border-solid outline-none px-[16px] py-[12px] rounded-[4px] text-[16px] ${
              totalNumberOfSeatStatus ? `border-[red]` : `border-[#5C5C5C]`
            }`}
            value={totalNumberOfSeat || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTotalNumberOfSeat(Number(e.target.value))
            }
          />
          {totalNumberOfSeatStatus ? (
            <p className="absolute top-[105px] text-[red]">
              {totalNumberOfSeatStatus}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-[16px] mb-[32px] relative">
        <label
          htmlFor="description"
          className="text-[#000] text-[24px] font-[400] "
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className={`2xl:w-full h-[102px] border border-solid ] outline-none px-[16px] py-[12px] rounded-[4px] text-[16px] resize-none ${
            descriptionStatus ? `border-[red]` : `border-[#5C5C5C]`
          }`}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value);
          }}
        />
        {descriptionStatus ? (
          <p className="absolute top-[155px] text-[red]">{descriptionStatus}</p>
        ) : null}
      </div>
      <div className="flex px-[16px] py-[12px] self-center md:self-end justify-center bg-[#1692EC] rounded-md w-[160px] text-white gap-[10px]">
        <Image src={saveIcon} alt="save icon" />
        <button className="text-[24px]">Save</button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default CreateForm;
