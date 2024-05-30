import React from "react";

interface FcCardProps {
  title: string;
  type: string;
  credits: number;
  semestre: string;
  description: string;
}

const FcCard: React.FC<FcCardProps> = ({
  title,
  type,
  credits,
  semestre,
  description,
}: FcCardProps) => {
  const convertSemesterLabel = (sem: string) => {
    switch (sem) {
      case "S1":
        return "1ere semestre";
      case "S2":
        return "2eme semestre";
      case "S3":
        return "3eme semestre";
      case "S4":
        return "4eme semestre";
      default:
        return sem;
    }
  };
  const convertPriorityLabel = (priority: string) => {
    switch (priority) {
      case "OBLIGATOIRE":
        return "Obligatoire";
      case "OPTIONNEL":
        return "Optionnel";
      default:
        return priority;
    }
  };
  return (
    <div>
      <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md mb-4">
        <div className="flex  lg:justify-between lg:items-center flex-col-reverse lg:flex-row">
          <span className="font-light text-gray-600">
            {" "}
            {convertSemesterLabel(semestre)}
          </span>
          <div className="px-2 py-1 bg-sky-500 text-gray-100 font-bold rounded hover:bg-sky-600">
            {title}
          </div>
        </div>
        <div className="mt-2">
          <p className="mt-2 text-gray-600">{description}</p>

          <div className="flex justify-between">
            <p className="mt-2 text-gray-600">{credits} credits</p>{" "}
            <p className="text-xl text-gray-700 font-bold hover:text-gray-600">
              {convertPriorityLabel(type)}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4"></div>
      </div>
    </div>
  );
};

export default FcCard;
