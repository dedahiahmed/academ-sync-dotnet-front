"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State variable to store error message
  const methods = useForm<login>({ mode: "all" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = methods;
  const onSubmit = async (data: login) => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }

      const responseData = await response.json();
      localStorage.clear();
      Cookies.remove("accessToken");
      const encryptedToken = CryptoJS.AES.encrypt(
        responseData.access_token,
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzg2MjU4NCwiaWF0IjoxNzA3ODYyNTg0fQ.5Ab6-iu6ds1--VS6JG5aLkpKSJggIL6f8c-nam79pPM"
      ).toString();
      // localStorage.setItem("accessToken", responseData.access_token);
      Cookies.set("accessToken", encryptedToken);
      window.location.href = "/";
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormProvider {...methods}>
          <form
            className="h-[25rem] space-y-6 bg-white shadow-md rounded px-8 pt-[2rem] pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="top-0 left-0">
              <Image
                alt=""
                src="assets/academ.svg"
                quality={100}
                width={50}
                height={50}
              />
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />

                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            {errorMessage && (
              <p className=" text-sm text-red-500">{errorMessage}</p>
            )}
            <div className="flex">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div>
              {" "}
              <a
                href="/signup"
                className="text-blue-400 ml-2 text-sm font-semibold hover:underline cursor-pointer"
              >
                Vous n'êtes pas encore inscrit ?
              </a>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
