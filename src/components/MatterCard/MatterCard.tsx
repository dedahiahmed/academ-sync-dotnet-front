import React from "react";

interface MatterCardProps {
  title: string;
  teacher: string;
  description: string;
  numberofhourse: number;
  semestre: string;
}

export default function MatterCard({
  title,
  teacher,
  description,
  numberofhourse,
  semestre,
}: MatterCardProps) {
  const convertSemesterLabel = (sem: string) => {
    switch (sem) {
      case "S1":
        return "1ere semestre";
      case "S2":
        return "2eme semestre";
      case "S3":
        return "3eme semestre";
      default:
        return sem;
    }
  };

  return (
    <div>
      <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md mb-4">
        <div className="flex  lg:justify-between lg:items-center flex-col-reverse lg:flex-row">
          <span className="font-light text-gray-600">
            {convertSemesterLabel(semestre)}
          </span>
          <div className="px-2 py-1 bg-sky-500 text-gray-100 font-bold rounded hover:bg-sky-600">
            {title}
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl text-gray-700 font-bold hover:text-gray-600">
            {teacher}
          </div>
          <p className="mt-2 text-gray-600">{description}</p>
          <div className="bg-sky-300 text-gray-100 font-bold rounded px-2 py-1 inline-block mt-2">
            {numberofhourse} heures par semestre
          </div>
        </div>
        <div className="flex justify-between items-center mt-4"></div>
      </div>
    </div>
  );
}
