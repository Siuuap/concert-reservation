'use client';
import React from 'react';
import DeleteConfirmationModal from './Modal/DeleteConfirmationModal';
import ReserveConfirmationModal from './Modal/ReserveConfirmationModal';

import { Overview } from '@/interface/Overview';
import { FiUser } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

import trashIcon from '@/assets/trash.svg';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useTicketContext } from '@/contexts/ticketContext';
import CancelConfirmationModal from './Modal/CancelConfirmationModal';
const Overview = (): React.ReactElement => {
  const { tickets, setTickets, history, setHistory } = useTicketContext();
  const pathName = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
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
  async function getHistory(): Promise<void> {
    const response = await axios.get('http://localhost:4000/user_tickets');
    setHistory(response.data);
  }
  async function getTickets() {
    const response = await axios.get('http://localhost:4000/tickets');
    setTickets(response?.data);
  }
  React.useEffect(() => {
    getTickets();
    getHistory();
  }, []);
  async function handleDeleteTicket(ticket_id: string): Promise<void> {
    try {
      const response = await axios.delete(
        `http://localhost:4000/tickets/${ticket_id}`
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
    closeModalDelete();
  }
  const [isModalOpenReserve, setIsModalOpenReserve] =
    React.useState<boolean>(false);

  const user_id = 'f0a90245-416d-46fc-870e-9d93a6dd2051';
  function reserveOrCancel(ticket_id: string) {
    let checker = 0;

    for (let i = 0; i < history.length; i++) {
      if (
        history[i].status === 'reserve' &&
        history[i].tickets.id === ticket_id &&
        history[i].user_id === user_id
      ) {
        checker += 1;
      }
      if (
        history[i].status === 'cancel' &&
        history[i].tickets.id === ticket_id &&
        history[i].user_id === user_id
      ) {
        checker -= 1;
      }
    }

    if (checker === 1) {
      return true;
    } else {
      return false;
    }
  }

  async function reserveTicket() {
    try {
      const response = await axios.post(``);
      toast.success(`Reserve ticket successfully`, {
        position: 'top-right',
        autoClose: 900,
        hideProgressBar: true,
        style: {
          backgroundColor: '#D0E7D2',
          color: '#2B2B2B',
          padding: '16px 6px',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function cancelTicket() {
    try {
      const response = await axios.post(``);
      toast.error('ticket has been cancelled', {
        position: 'top-right',
        autoClose: 900,
        hideProgressBar: true,
        style: {
          backgroundColor: '#fed2d2',
          color: '#b30000',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
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

  React.useEffect(() => {
    if (pathName.startsWith('/admin')) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    getTickets();
  }, [pathName]);

  return (
    <>
      {tickets.length === 0 ? (
        <p className="text-center">Do not have ticket for concert now</p>
      ) : (
        tickets?.map((item: Overview, index: number) => {
          return (
            <div
              key={item.id}
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
                        onClick={() => {
                          router.push(`/admin/overview/${String(item.id)}`);
                        }}
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
                        ticket_id={item.id}
                        getTickets={getTickets}
                        handleDeleteTicket={() =>
                          handleDeleteTicket(String(item.id))
                        }
                      />
                    </>
                  ) : (
                    <div>
                      {reserveOrCancel(item.id) ? (
                        <>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                            onClick={() => {
                              router.push('/cancel/' + String(item.id));
                            }}
                          >
                            Cancel
                          </button>
                          <CancelConfirmationModal
                            isOpen={isModalOpenCancel}
                            onClose={closeModalCancel}
                            user_id={user_id}
                            ticket_id={item.id}
                          />
                        </>
                      ) : (
                        <>
                          <button
                            className="px-4 py-2 bg-[#1692EC] text-white rounded hover:bg-[#0084e3] focus:outline-none"
                            onClick={() => {
                              console.log(`ticket_id`, item.id);
                              router.push(`/reserve/${String(item.id)}`);
                            }}
                          >
                            Reserve
                          </button>
                          <ReserveConfirmationModal
                            isOpen={isModalOpenReserve}
                            onClose={closeModalReserve}
                            user_id={user_id}
                            ticket_id={item.id}
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
