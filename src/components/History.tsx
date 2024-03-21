'use client';
import React, { useState } from 'react';
import dataDb from '@/assets/db/db';
import { History } from '@/interface/History';
import axios from 'axios';
import { useTicketContext } from '@/contexts/ticketContext';
const HistoryPage: () => React.ReactElement = () => {
  const { history, setHistory } = useTicketContext();
  function formatDate(d: Date) {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return `${day}/${month}/${year} ${time}`;
  }
  async function getHistory(): Promise<void> {
    const response = await axios.get('http://localhost:4000/user_tickets');
    console.log(response.data);

    setHistory(response.data);
  }

  React.useEffect(() => {
    getHistory();
  }, []);
  return (
    <>
      <div className="flex justify-center m-4">
        <table className="table-autorounded-2xl w-full border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">Date Time</th>
              <th className="border border-slate-300">Username</th>
              <th className="border border-slate-300">Concert name</th>
              <th className="border border-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td className=" text-center border border-slate-300">
                    {formatDate(item.action_date)}
                  </td>
                  <td className=" text-center border border-slate-300">
                    {item.users?.user_profile[0]?.firstname}{' '}
                    {item.users?.user_profile[0]?.lastname}
                  </td>
                  <td className=" text-center border border-slate-300">
                    {item.tickets?.concert_name}
                  </td>
                  <td className=" text-center border border-slate-300">
                    {item.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistoryPage;
