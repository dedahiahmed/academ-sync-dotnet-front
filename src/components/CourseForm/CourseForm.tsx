"use client";
import React, { useState } from "react";
import DropDown from "../DropDownInput/DropDownInput";
import semesterList from "@/data/lists/semester-list";
import courseType from "@/data/lists/type-list";
import FileInput from "../FileInput/FileInput";
import {
  filesTypeList,
  imagesTypeList,
} from "@/data/data-base/file-types/file-types";
import { FormProvider, useForm } from "react-hook-form";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import { getCurrentUser } from "@/utils/user-me/userme";
import uploadMultiplesFiles from "@/utils/upload-files/upload-files";
import { Spin } from "antd";
import { accessToken } from "@/utils/token/token";

export default function CourseForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<courseType>({ mode: "all" });
  const { register, handleSubmit, formState, reset, control } = form;
  const { errors } = formState;
  const onSubmit = async (data: courseType) => {
    try {
      setLoading(true);

      const responseTeacher = await getCurrentUser();
      const TeacherId = responseTeacher.id;
      //  Upload files
      const uploadedFileIds = await uploadMultiplesFiles("course", files);

      // Construct request data with uploaded file UUIDs
      const requestData = {
        ...data,
        teacher_id: TeacherId,
        files: uploadedFileIds,
      };

      // Send request to create course
      const response = await fetch("/api/course", {
        method: "POST",
        headers: {
          Authorization: accessToken,

          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }

      const responseData = await response.json();
      console.log("-----------", responseData);
    } catch (error: any) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      window.location.href = "/gestion-cours";
      // Set loading to false when request completes
    }
  };

  return (
    <div className="bg-gray-100 pb-[2rem] ">
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
      <p className="text-xl text-black font-normal  flex justify-start items-start bg-gray-100  mt-[1rem] ml-[5rem]">
        Ajouter un Cours
      </p>{" "}
      <FormProvider {...form}>
        <div className="lg:pl-[25rem] ">
          {" "}
          <form
            className=" p-[1rem] mt-[1.25rem] lg:mt-[2.5rem] bg-white lg:w-[50%] lg:p-[2rem] border lg:rounded-lg lg:shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/*name*/}
            <div className="flex flex-col  gap-[0.5rem] ">
              <p className="  font-text text-[0.875rem] font-[500] leading-[1.375rem]  lg:mb-[0.5rem] lg:text-[0.9375rem] lg:leading-[1.25rem]">
                Titre * :
              </p>
              <input
                placeholder="Le nom de votre entreprise."
                type="text "
                className="
             flex h-[2.8125rem]  items-center gap-[0.625rem] rounded-lg border
            border-stone-900 py-[0.3125rem] pl-[0.625rem] pr-[2.5rem] font-text  csm:w-[20.625rem] lg:mb-[0.5rem]  lg:h-[3.125rem] w-full lg:gap-[0.625rem] lg:py-[0.9375rem] lg:pl-[0.625rem] lg:pr-[2.5rem]"
                {...register("title", {
                  required: "Titre requis.",
                })}
              />
              <p className="  font-text text-[0.875rem] font-[500] leading-[1.375rem]  text-[#C54141] mb-[0.5rem] lg:mb-[1.87rem] lg:text-[0.9375rem] lg:leading-[1.25rem]">
                {errors.title?.message}
              </p>
            </div>

            <div className="flex flex-col  gap-[0.5rem] ">
              <p className=" mb-[0.37rem] font-text text-[0.875rem] font-[500] leading-[1.375rem]  lg:mb-[0.5rem] lg:text-[0.9375rem] lg:leading-[1.25rem]">
                Semestre* :
              </p>
              <DropDown
                placeHolder="Sélectionner un semestre."
                requiredMessage="Vous devez choisir le semestre."
                name="semester"
                list={semesterList}
              />
              <p className="  font-text text-[0.875rem] font-[500] leading-[1.375rem]  text-[#C54141] lg:mb-[1.87rem] lg:text-[0.9375rem] lg:leading-[1.25rem]">
                {errors.semester?.message}
              </p>
            </div>
            {/*industry */}
            <div className="flex flex-col  gap-[0.5rem] ">
              <p className=" mb-[0.37rem] font-text text-[0.875rem] font-[500] leading-[1.375rem]  lg:mb-[0.5rem] lg:text-[0.9375rem] lg:leading-[1.25rem]">
                type du cours* :
              </p>
              <DropDown
                placeHolder="Sélectionner type du cour."
                requiredMessage=" Vous devez sélectionner le type du cour."
                name="type"
                list={courseType}
              />
              <p className="  font-text text-[0.875rem] font-[500] leading-[1.375rem]  text-[#C54141] lg:mb-[1.87rem] lg:text-[0.9375rem] lg:leading-[1.25rem]">
                {errors.type?.message}
              </p>
            </div>

            <div className="flex flex-col  gap-[0.5rem] ">
              {" "}
              <p className=" mb-[0.37rem] font-text text-[0.875rem] font-[500] leading-[1.375rem]  lg:mb-[0.5rem] lg:text-[0.9375rem] lg:leading-[1.25rem]">
                fichier* :
              </p>
              <FileInput
                acceptedTypes={filesTypeList}
                limit={true}
                valueSetter={setFiles}
                files={files}
              />
            </div>

            <button
              className="mb-[1.25rem] w-[100%] inline-flex
  items-center justify-center 
  rounded-lg
  bg-sky-500 
  hover:bg-hblue
px-[2.25rem] py-[0.9375rem]
  "
            >
              <p className="font-text text-[0.9375rem]  font-[500] leading-[1.375rem] text-white lg:text-[1.125rem] lg:leading-[1.625rem]">
                {loading ? <Spin /> : "Enregistrer"}{" "}
                {/* Render Spin component if loading is true */}
              </p>
            </button>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
