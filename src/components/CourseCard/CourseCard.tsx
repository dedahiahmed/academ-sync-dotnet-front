import React from "react";
import FilesLister from "../FilesLister/FilesLister";

interface CourseCardProps {
  title: string;
  type: string;
  semester: string;
  matter?: string;
  files: CourseUrl[];
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  type,
  semester,
  matter,
  files,
}) => {
  const convertSemesterLabel = (sem: string) => {
    switch (sem) {
      case "S1":
        return "1ère semestre";
      case "S2":
        return "2ème semestre";
      case "S3":
        return "3ème semestre";
      default:
        return sem;
    }
  };

  const convertTypeLabel = (type: string) => {
    switch (type) {
      case "TP":
        return "travaux pratiques";
      case "TD":
        return "Travaux dirigés";
      case "COURSE":
        return "Cours Normal";
      default:
        return type;
    }
  };
  return (
    <div>
      <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md mb-4">
        <div className="flex  lg:justify-between lg:items-center flex-col-reverse lg:flex-row">
          <span className="font-light text-gray-600">
            {convertSemesterLabel(semester)}
          </span>
          <div className="px-2 py-1 bg-sky-500 text-gray-100 font-bold rounded hover:bg-sky-600">
            {title}
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="bg-sky-300 text-gray-100 font-bold rounded px-2 py-1 inline-block mt-2">
            {convertTypeLabel(type)}
          </div>
          {matter && (
            <div className="bg-sky-300 text-gray-100 font-bold rounded px-2 py-1 inline-block mt-2">
              {matter}
            </div>
          )}
        </div>
        {files &&
          files.length > 0 && ( // Conditional rendering of FilesLister
            <div className="mt-2">
              <FilesLister filesList={files} />
            </div>
          )}
        <div className="flex justify-between items-center mt-4"></div>
      </div>
    </div>
  );
};

export default CourseCard;
