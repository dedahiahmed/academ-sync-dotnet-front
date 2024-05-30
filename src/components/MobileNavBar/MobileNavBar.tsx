"use client";

import { LiaTimesSolid } from "react-icons/lia";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MobileNavBar() {
  const router = useRouter();

  const closeModal = (path: string) => {
    const modal = document.getElementById(
      "mobile-nav-bar"
    ) as HTMLDialogElement | null;
    if (modal) {
      console.log("modal found");
      modal.close();
      router.push(path, { scroll: false });
    } else {
      console.log("modal NOT found");
    }
  };

  return (
    <dialog id="mobile-nav-bar" className="modal w-full h-full ">
      <div className="  modal-box flex top-0 left-0 min-h-screen max-h-none w-screen max-w-none flex-col flex-wrap justify-start rounded-none  bg-white px-0 py-0 ">
        <div className="flex justify-between px-[1.5rem] pt-[2.3rem] items-center border-none focus:border-none mb-[1.5rem] ">
          <a
            onClick={() => {
              closeModal("#");
            }}
            className="text-cblack text-[0.875rem] font-[600] leading-[1.125rem] focus:outline-none font-text border-none"
            href={`/`}
          >
            <Image
              className=" h-[1.5rem]  w-[1.86569rem] border-none focus:border-none "
              src={"/assets/academ.svg"}
              width={60} // Set the width to match 3.125rem (80px)
              height={60} // Route of the image file
              alt={""}
              quality={95}
            />
          </a>
          <LiaTimesSolid
            onClick={() => {
              closeModal("#");
            }}
            className="hover:text-cblue2 text-cblack "
            color=""
            size="1.8rem"
          />
        </div>

        <div className="flex flex-col justify-start items-start space-y-[2rem] lg:hidden md:hidden pl-[1rem]">
          <a href="/home" className="text-cblack">
            Accueil
          </a>
          <a href="/about" className="text-cblack">
            Cours
          </a>
          <a href="/archive" className="text-cblack">
            Archive
          </a>
          <a href="/emploi" className="text-cblack">
            Emploi
          </a>
        </div>

        <div className="flex-col flex  py-[1.62rem] gap-[1.25rem] px-[1.5rem]">
          <button className="inline-block md:hidden lg:hidden py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
            se deconnecter
          </button>
        </div>
      </div>
    </dialog>
  );
}
