import CreateForm from '@/components/CreateForm';
import Status from '@/components/Status';
import SideBar from '@/components/SideBar';
import Link from 'next/link';
const CreatePage: () => React.ReactElement = () => {
  return (
    <section className="mx-auto flex 2xl:h-screen w-[375px] sm:w-[640px] md:w-[768px] lg:w-[1024px] 2xl:w-[1440px]">
      <section className="relative">
        <SideBar />
      </section>
      <section className="flex flex-col 2xl:h-screen w-[375px] sm:w-[640px] md:w-[768px] lg:w-[1024px] 2xl:w-[1200px] 2xl:mt-[20px] 2xl:mb-[40px] 2xl:p-[40px] gap-[48px] p-[16px]">
        <div className="w-full mt-[80px] 2xl:mt-[0px]">
          <Status />
        </div>
        <div className="flex gap-[16px] w-full">
          <Link href={`/admin/overview`}>
            <p className="px-[16px] py-[10px] text-[24px] w-fit ">Overview</p>
          </Link>
          <Link href={`/admin/create`}>
            <p className="text-[#1692EC] font-[600] px-[16px] py-[10px] text-[24px] border-b-[2px] border-solid border-[#1692EC] w-fit">
              Create
            </p>
          </Link>
        </div>
        <div className="w-full">
          <CreateForm />
        </div>
      </section>
    </section>
  );
};

export default CreatePage;
