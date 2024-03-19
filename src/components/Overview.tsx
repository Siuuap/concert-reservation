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

const Overview = (): React.ReactElement => {
  const pathName = usePathname();
  const [status, setStatus] = React.useState<number>(0);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [data, setdata] = React.useState<Overview[]>([...DataOverview]);
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
  const onDelete = (): void => {
    setIsModalOpenCancel(false);
  };
  const [isModalOpenReserve, setIsModalOpenReserve] =
    React.useState<boolean>(false);

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
  }, [pathName]);
  return (
    <>
      {data.map((item: Overview, index: number) => {
        return (
          <div
            key={index}
            className="border border-solid border-[#C2C2C2] mb-7 rounded-lg p-[24px] 2xl:p-[40px] w-full flex flex-col gap-[24px]"
          >
            <h2 className="text-[32px] border-b border-solid border-[#C2C2C2] text-[#1692EC] pb-[24px]">
              {item.name}
            </h2>

            <p>{item.detail}</p>
            <div className=" flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-4 text-lg">
                <FiUser /> {item.people}
              </div>
              <div className="flex w-[50%] justify-end  gap-[16px]">
                {isAdmin ? (
                  <>
                    <button
                      className="px-4 py-2 bg-[#1692EC] text-white rounded hover:bg-[#0084e3] focus:outline-none  w-[50%] sm:w-[128px]"
                      onClick={openModalReserve}
                    >
                      Edit
                    </button>
                    <EditConcertModal
                      isOpen={isModalOpenReserve}
                      onClose={closeModalReserve}
                      onSave={onSave}
                    />
                    <button
                      className="px-[16px] py-[12px] bg-red-500 text-white rounded hover:bg-red-800 focus:outline-none w-[50%] sm:w-[128px] flex justify-center gap-[10px]"
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
                      onDelete={onDelete}
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
                          onDelete={onDelete}
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
          </div>
        );
      })}
    </>
  );
};

export default Overview;
