'use client';
import React from 'react';
import { FiHome } from 'react-icons/fi';
import { GoInbox } from 'react-icons/go';
import { PiUserSwitch } from 'react-icons/pi';
import { MdOutlineLogout, MdMenu } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideBar: React.FC = () => {
  const router = usePathname();
  const [url, setUrl] = React.useState<string>('');
  const [user, setUser] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    React.useState<boolean>(false);
  const [isHidden, setIsHidden] = React.useState<string>('');

  React.useEffect(() => {
    if (router.startsWith('/admin')) {
      setUser('User');
      setUrl('/');
      setTitle('Admin');
      setIsHidden('');
    } else {
      setUser('Admin');
      setUrl('/admin/overview');
      setTitle('User');
      setIsHidden('hidden');
    }
  }, [router]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const menu = document.getElementById('mobileMenu');
    if (!menu?.contains(target)) {
      setIsMobileMenuOpen(false);
    }
  };

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', closeMobileMenu);
    } else {
      document.removeEventListener('mousedown', closeMobileMenu);
    }
    return () => {
      document.removeEventListener('mousedown', closeMobileMenu);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex h-screen relative 2xl:w-[240px]">
      <div className="2xl:hidden fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-4 py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div
          className="hover:text-gray-300 cursor-pointer"
          onClick={toggleMobileMenu}
        >
          {!isMobileMenuOpen ? <MdMenu /> : <IoClose />}
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          id="mobileMenu"
          className="2xl:hidden fixed top-14 right-0 z-50 p-2  "
        >
          <div className="absolute top-full right-0 mt-1 p-4 bg-white shadow-md z-50 rounded-lg w-screen">
            <div
              className={`p-4 hover:bg-[#EAF5F9] hover:cursor-pointer hover:rounded-xl ${isHidden}`}
            >
              <Link href={title === 'Admin' ? '/admin/overview' : '/'}>
                <p className=" flex flex-row items-center gap-2 text-[24px] font-[400]">
                  <FiHome />
                  Home
                </p>
              </Link>
            </div>
            <div
              className={`p-4  hover:bg-[#EAF5F9] hover:cursor-pointer hover:rounded-xl ${isHidden}`}
            >
              <Link href="/admin/history">
                <p className=" flex flex-row items-center gap-2 text-[24px] font-[400]">
                  <GoInbox />
                  History
                </p>
              </Link>
            </div>
            <div className="p-4 hover:bg-[#EAF5F9] hover:cursor-pointer hover:rounded-xl ">
              <Link href={url}>
                <p className="flex flex-row items-center gap-2 text-[24px] font-[400]">
                  <PiUserSwitch />
                  Switch to {user}
                </p>
              </Link>
            </div>
            <div className="p-4 hover:bg-[#EAF5F9] hover:cursor-pointer hover:rounded-xl">
              <h1 className="flex flex-row items-center gap-2 text-[24px] font-[400]">
                <MdOutlineLogout />
                Logout
              </h1>
            </div>
          </div>
        </div>
      )}
      <div className="hidden 2xl:flex 2xl:flex-col 2xl:w-[240px] bg-white shadow-md justify-between fixed h-screen">
        <div className="my-[40px]">
          <Link href={title === 'Admin' ? '/admin/overview' : '/'}>
            <h1 className="p-[24px] text-3xl font-bold">{title}</h1>
          </Link>
          <div
            className={`p-4 hover:bg-[#EAF5F9] hover:cursor-pointer hover:rounded-xl ${isHidden}`}
          >
            <Link href={title === 'Admin' ? '/admin/overview' : '/'}>
              <p className="flex flex-row items-center gap-2 text-[24px] font-[400]">
                <FiHome />
                Home
              </p>
            </Link>
          </div>
          <div
            className={`p-[8px] mx-[8px] hover:bg-[#EAF5F9] hover:cursor-pointer hover:rounded-xl ${isHidden}`}
          >
            <Link href="/admin/history">
              <p className="flex flex-row items-center gap-2 text-[24px] font-[400]">
                <GoInbox />
                History
              </p>
            </Link>
          </div>
          <div className="p-4 hover:bg-[#EAF5F9] hover:cursor-pointer hover:rounded-xl ">
            <Link href={url}>
              <p className="flex flex-row items-center gap-2 text-[24px] font-[400]">
                <PiUserSwitch />
                Switch to {user}
              </p>
            </Link>
          </div>
        </div>
        <div className=" pb-[80px]">
          <div className="p-4 hover:bg-[#EAF5F9] hover:cursor-pointer hover:rounded-xl mx-3">
            <h1 className="flex flex-row items-center gap-2 text-[24px] font-[400]">
              <MdOutlineLogout />
              Logout
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
