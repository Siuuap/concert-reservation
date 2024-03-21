import Status from '@/components/Status';
import SideBar from '@/components/SideBar';
import History from '@/components/History';
import Link from 'next/link';
const HistoryPage: () => React.ReactElement = () => {
  return (
    <section className="mx-auto flex 2xl:h-screen w-[375px] sm:w-[640px] md:w-[768px] lg:w-[1024px] 2xl:w-[1440px]">
      <section className="relative">
        <SideBar />
      </section>
      <section className="flex flex-col 2xl:h-screen w-[375px] sm:w-[640px] md:w-[768px] lg:w-[1024px] 2xl:w-[1200px] 2xl:mt-[20px] 2xl:mb-[40px] 2xl:p-[40px] gap-[48px] p-[16px]">
        <div className="w-full mt-[80px] 2xl:mt-[0px]">
          <Status />
        </div>

        <div className="">
          <History />
        </div>
      </section>
    </section>
  );
};

export default HistoryPage;
