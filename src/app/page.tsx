import Overview from '@/components/Overview';
import SideBar from '@/components/SideBar';

const HomePage = () => {
  return (
    <section className="mx-auto flex 2xl:h-screen w-[375px] sm:w-[640px] md:w-[768px] lg:w-[1024px] 2xl:w-[1440px]">
      <section className="w-[240px] relative">
        <SideBar />
      </section>
      <section className="flex flex-col 2xl:h-screen w-[375px] sm:w-[640px] md:w-[768px] lg:w-[1024px] 2xl:w-[1200px] 2xl:my-[40px]">
        <div className="w-[375px] sm:w-[640px] md:w-[768px] lg:w-[1024px] 2xl:w-[1200px] mt-[80px] 2xl:mt-[0px]"></div>
        <div className="">
          <Overview />
        </div>
      </section>
    </section>
  );
};

export default HomePage;
