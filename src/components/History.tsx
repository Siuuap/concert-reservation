'use client';
import React, { useState } from 'react';
import dataDb from '@/assets/db/db';
import { History } from '@/interface/History';
const History: () => React.ReactElement = () => {
  const [data, setdata] = useState<History[]>([...dataDb]);

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
            {data.map((item: History, index: number) => {
              return (
                <tr key={index}>
                  <td className=" text-center border border-slate-300">
                    {item.dateTime}
                  </td>
                  <td className=" text-center border border-slate-300">
                    {item.userName}
                  </td>
                  <td className=" text-center border border-slate-300">
                    {item.concertName}
                  </td>
                  <td className=" text-center border border-slate-300">
                    {item.action}
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

export default History;
