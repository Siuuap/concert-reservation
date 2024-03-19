'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminData } from '@/interface/AdminData';

const AdminLoginPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [emailStatus, setEmailStatus] = React.useState<string>('');
  const [passwordStatus, setPasswordStatus] = React.useState<string>('');

  const router = useRouter();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setEmailStatus('');
    setPasswordStatus('');
    const data: AdminData = { email, password, role: 'admin' };
    if (!email || !password) {
      if (!email) {
        setEmailStatus('Cannot be blanked');
      }
      if (!password || password.length < 7) {
        setPasswordStatus(
          'Cannot be blanked and must contain at least 7 characters'
        );
      }
      return;
    }
    if (email && password && password.length >= 7) {
      //   const response = await adminRegister(data);

      //   if (response.data.error?.code === '23505') {
      //     setIsEmailOK(false);
      //     setEmailStatus('This email already exists');
      //     return;
      //   }

      router.push('/admin/login');
    }
  }

  return (
    <section className="bg-[#00A58B] h-dvh flex justify-center items-center">
      <form
        className="flex flex-col w-[300] p-[30px] m-[16px] gap-[40px] bg-white rounded-[8px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col items-center">
          <p className="text-center text-[24px] text-[#646D89] font-bold leading-[30px]">
            Admin Login
          </p>
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="email">Email</label>
          <input
            className={`p-[12px] border border-solid ${
              emailStatus ? `border-[red]` : `border-[#D6D9E4]`
            } rounded-[8px]`}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          {emailStatus ? (
            <p className="absolute top-[105%] text-red-600 text-[10px] text italic">
              {emailStatus}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col relative ">
          <label htmlFor="password">Password</label>
          <input
            className={`p-[12px] border border-solid ${
              passwordStatus ? `border-[red]` : `border-[#D6D9E4]`
            } rounded-[8px]`}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          {passwordStatus ? (
            <p className="absolute top-[105%] text-red-600 text-[10px] text italic">
              {passwordStatus}
            </p>
          ) : null}
        </div>
        <button className="bg-[#0070A4] px-[32px] py-[18px] rounded-[12px] text-[#fff] text-base">
          Login
        </button>
      </form>
    </section>
  );
};

export default AdminLoginPage;
