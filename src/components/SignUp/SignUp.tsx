"use client";
import React from "react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

import InputText from "../InputText/InputText";
import { createUser } from "@/utils/CreateUser/CreateUser";
export default function SignUp() {
  const methods = useForm<SignUp>({ mode: "all" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = methods;

  const onSubmit = async (data: SignUp) => {
    try {
      let response;
      const CreateUser: user = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        role: "STUDENT",
      };
      const UserId = await createUser(CreateUser);
      let submitData = {
        user_id: UserId,
        sector: data.sector,
      };

      response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const responseData = await response.json();
      console.log(responseData);
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen px-[2rem] lg:px-[10rem] bg-gray-100 flex items-center justify-center w-full">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 w-full md:w-full lg:w-[50%] flex flex-col justify-center items-center space-y-[0.5rem]"
        >
          <div className="top-0 left-0">
            <Image
              alt=""
              src="assets/academ.svg"
              quality={100}
              width={60}
              height={60}
            />
          </div>
          <div className="w-full">
            <InputText
              name="last_name"
              label="prénom"
              type="text"
              placeholder="prénom"
              validationRules={{
                required: "prénom est requis ",
              }}
            />
          </div>

          <div className="w-full">
            <InputText
              name="first_name"
              label="Nom"
              type="text"
              placeholder="Nom"
              validationRules={{
                required: "Nom est requis ",
              }}
            />
          </div>
          <div className="w-full">
            <InputText
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              validationRules={{
                required: "Email est requis",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                  message: "Invalid email format",
                },
              }}
            />
          </div>

          <div className="w-full">
            <InputText
              name="password"
              label="Mot de passe"
              type="password"
              placeholder="Mot de passe"
              validationRules={{
                required: "Mot de passe est requis ",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre et un chiffre",
                },
              }}
            />
          </div>

          <div className="w-full">
            <InputText
              name="sector"
              label="Filière"
              type="text"
              placeholder="Filière"
              validationRules={{
                required: "Filière est requis ",
              }}
            />
          </div>

          <div className="pt-[1rem] flex items-center justify-between lg:space-x-[10rem] ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Sign Up
            </button>

            <a
              href="/signup"
              className="text-blue-400 ml-2 text-sm font-semibold hover:underline cursor-pointer"
            >
              Vous êtes déjà inscrit ?
            </a>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
