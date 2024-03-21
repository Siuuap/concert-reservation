'use client';
import React from 'react';
import DeleteConfirmationModal from './Modal/DeleteConfirmationModal';
import ReserveConfirmationModal from './Modal/ReserveConfirmationModal';
import DataOverview from '@/assets/db/db2';
import { Overview } from '@/interface/Overview';
import { FiUser } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import EditConcertModal from './Modal/EditConcertModal';
import trashIcon from '@/assets/trash.svg';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useTicketContext } from '@/contexts/ticketContext';

const Overview = (): React.ReactElement => {
  const { tickets, setTickets } = useTicketContext();
  // const tickets = AllTickets.tickets;
  // const setTickets = AllTickets.setTickets;

  const pathName = usePathname();
  const router = useRouter();
  const [status, setStatus] = React.useState<number>(0);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  // const [tickets, setTickets] = React.useState<Overview[]>([]);
  const [isModalOpenCancel, setIsModalOpenCancel] =
    React.useState<boolean>(false);
  const [isModaleDeleteOpen, setIsModalDeleteOpen] =
    React.useState<boolean>(false);
  const openModalDelete = (): void => {
    setIsModalDeleteOpen(true);
  };
  const closeModalDelete = (): void => {
    setIsModalDeleteOpen(false);
  };
  const openModalCancel = (): void => {
    setIsModalOpenCancel(true);
  };
  const closeModalCancel = (): void => {
    setIsModalOpenCancel(false);
  };
  async function onDelete(id: string): Promise<void> {
    try {
      const response = await axios.delete(
        `http://localhost:4000/tickets/${id}`
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
      getTickets();
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
    setIsModalDeleteOpen(false);
  }
  const [isModalOpenReserve, setIsModalOpenReserve] =
    React.useState<boolean>(false);
  // async function getTicketData(id: string) {
  //   try {
  //     const response = await axios.get(`http://localhost:4000/tickets/${id}`);
  //     console.log(response);
  //     setConcertName(response.data.concert_name);
  //     setTotalNumberOfSeat(response.data.total_seat);
  //     setDescription(response.data.description);
  //   } catch (error) {
  //     console.log(`error from axios`, error);
  //   }
  // }
  const openModalReserve = (): void => {
    setIsModalOpenReserve(true);
  };
  const closeModalReserve = (): void => {
    setIsModalOpenReserve(false);
  };
  const onDeleteReserve = (): void => {
    setIsModalOpenReserve(false);
  };
  const onSave = (): void => {};

  async function getTickets() {
    const response = await axios.get('http://localhost:4000/tickets');
    setTickets(response?.data);
  }

  React.useEffect(() => {
    if (pathName.startsWith('/admin')) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [pathName]);

  React.useEffect(() => {
    getTickets();
  }, []);

  return (
    <>
      {tickets.length === 0 ? (
        <p className="text-center">Do not have ticket for concert now</p>
      ) : (
        tickets?.map((item: Overview, index: number) => {
          return (
            <div
              key={index}
              className="border border-solid border-[#C2C2C2] mb-7 rounded-lg p-[24px] 2xl:p-[40px] w-full flex flex-col gap-[24px]"
            >
              <h2 className="text-[32px] font-[600] border-b border-solid border-[#C2C2C2] text-[#1692EC] pb-[24px]">
                {item.concert_name}
              </h2>
              <p className="text-[24px] font-[400]">{item.description}</p>
              <div className=" flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-4 text-[24px] font-[400]">
                  <FiUser /> {item.total_seat}
                </div>
                <div className="flex w-[50%] justify-end  gap-[16px]">
                  {isAdmin ? (
                    <>
                      <button
                        className="px-4 py-2 bg-[#1692EC] text-white rounded hover:bg-[#0084e3] focus:outline-none  w-[50%] sm:w-[128px] font-[400] text-[18px] sm:text-[24px]"
                        onClick={() => {
                          router.push(`/admin/edit/${String(item.id)}`);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="px-[16px] py-[12px] bg-red-500 text-white rounded hover:bg-red-800 focus:outline-none w-[50%] sm:w-[128px] flex justify-center gap-[10px] text-[18px] sm:text-[24px] font-[400] items-center"
                        onClick={openModalDelete}
                      >
                        <Image
                          src={trashIcon}
                          alt="trash icon"
                          className="hidden sm:block"
                        />
                        Delete
                      </button>
                      <DeleteConfirmationModal
                        isOpen={isModaleDeleteOpen}
                        onClose={closeModalDelete}
                        onDelete={() => onDelete(item.id)}
                      />
                    </>
                  ) : (
                    <div>
                      {status == 1 ? (
                        <>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                            onClick={openModalCancel}
                          >
                            Cancel
                          </button>
                          <DeleteConfirmationModal
                            isOpen={isModalOpenCancel}
                            onClose={closeModalCancel}
                            onDelete={() => onDelete(item.id)}
                          />
                        </>
                      ) : (
                        <>
                          <button
                            className="px-4 py-2 bg-[#1692EC] text-white rounded hover:bg-[#0084e3] focus:outline-none"
                            onClick={openModalReserve}
                          >
                            Reserve
                          </button>
                          <ReserveConfirmationModal
                            isOpen={isModalOpenReserve}
                            onClose={closeModalReserve}
                            onDelete={onDeleteReserve}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <ToastContainer />
            </div>
          );
        })
      )}
    </>
  );
};

export default Overview;
