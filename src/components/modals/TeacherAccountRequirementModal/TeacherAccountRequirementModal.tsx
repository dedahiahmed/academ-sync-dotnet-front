"use client";
import Image from "next/image";
import { LiaTimesSolid } from "react-icons/lia";
import { RiAlertFill } from "react-icons/ri";

export default function TeacherAccountRequirementModal() {
  const closeModal = () => {
    const modal = document.getElementById(
      "teacher-require-modal"
    ) as HTMLDialogElement | null;
    if (modal) {
      console.log("modal found");
      modal.close();
    } else {
      console.log("modal NOT found");
    }
  };
  return (
    <dialog
      id="teacher-require-modal"
      className="modal p-[1rem] lg:p-0 md:p-0 "
    >
      <div className="modal-box w-full md:max-w-none md:w-[37.6875rem] px-4 md:px-[3.31rem] py-4 md:py-[1.62rem] rounded-lg">
        <div className="mb-[1.37rem] flex  gap-[1rem] items-center w-full justify-between">
          <div className="flex gap-[0.81rem] items-center">
            <RiAlertFill size={"1.625rem"} className="text-[#FEC901]" />
            <p className="text-justify font-title text-md lg:text-[1.4375rem] font-[600] leading-[3.125rem] text-[#FEC901]">
              avertissement !
            </p>
          </div>
          <LiaTimesSolid
            onClick={() => {
              closeModal();
            }}
            className="hover:text-hblue cursor-pointer text-cblue "
            color=""
            size="1.8rem"
          />
        </div>
        <p className="mb-[1.75rem] text-justify font-text  lg:text-[1rem] font-[400] leading-[1.375rem]">
          Vous ne pouvez pas accéder à cette fonctionnalité car elle est
          réservée aux enseignants et aux administrateurs. Cette section est
          uniquement accessible aux comptes
        </p>
      </div>
    </dialog>
  );
}
