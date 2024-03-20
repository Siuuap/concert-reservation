'use client';
import React from 'react';
import { Concert } from '@/interface/Ticket';
import axios from 'axios';
import Image from 'next/image';
import saveIcon from '@/assets/save.svg';
import Modal from './Modal';
import axios from 'axios';
interface EditConcertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  id: string;
}

const EditConcertModal: React.FC<EditConcertModalProps> = ({
  isOpen,
  onClose,
  onSave,
  id,
}) => {
  const [concertName, setConcertName] = React.useState<string>('');
  const [totalNumberOfSeat, setTotalNumberOfSeat] = React.useState<number>(0);
  const [description, setDescription] = React.useState<string>('');

  const [concertNameStatus, setConcertNameStatus] = React.useState<string>('');
  const [totalNumberOfSeatStatus, setTotalNumberOfSeatStatus] =
    React.useState<string>('');
  const [descriptionStatus, setDescriptionStatus] = React.useState<string>('');
  async function fetchDataToEdit() {
    const response = await axios.get('');
  }
  const handleSubmit = (e: React.SyntheticEvent): void => {
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
      return;
    }
    const concert: Concert = {
      concert_name: concertName,
      number_of_seat: totalNumberOfSeat,
      description: description,
    };
    const response = axios.post('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        className="w-[375px] sm:w-[640px] md:w-[768px] lg:w-[1024px] 2xl:w-[1200px] flex flex-col p-[16px] 2xl:p-[40px] gap-[30px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-[#1692EC] text-[40px] font-[600] border-b border-solid border-b-[#C2C2C2] pb-[24px]">
          Edit
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
            <p className="absolute top-[155px] text-[red]">
              {descriptionStatus}
            </p>
          ) : null}
        </div>
        <div className="flex w-full justify-between">
          <div className="flex px-[16px] py-[12px] self-center md:self-start justify-center bg-gray-400 rounded-md w-[160px] text-white gap-[10px]">
            <button className="text-[24px]" onClick={onClose}>
              cancel
            </button>
          </div>
          <div className="flex px-[16px] py-[12px] self-center md:self-end justify-center bg-[#1692EC] rounded-md w-[160px] text-white gap-[10px]">
            <Image src={saveIcon} alt="save icon" />
            <button className="text-[24px]">Update</button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditConcertModal;
