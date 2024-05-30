import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import FilesPreviewer from "../FilesPreviewer/FilesPreviewer";

export default function FileInput({
  valueSetter,
  limit,
  acceptedTypes,
  files,
}: Readonly<{
  files: File[];
  acceptedTypes?: string[];
  limit?: boolean;
  valueSetter: (list: File[]) => void;
}>) {
  const [error, setError] = useState<any>();
  const [selectedFiles, setSelectedFiles] = useState<any>([]);

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      // Check if the file extension is in the acceptedTypes list
      if (
        acceptedTypes &&
        acceptedTypes.length > 0 &&
        !acceptedTypes.includes(fileExtension)
      ) {
        // If the file extension is not in the acceptedTypes, you can either notify the user or simply return.
        setError(true);

        return;
      }

      if (limit) {
        setError(false);
        setSelectedFiles([selectedFile]);
        valueSetter([selectedFile]);
      } else {
        setSelectedFiles([...selectedFiles, selectedFile]);
        valueSetter([...selectedFiles, selectedFile]);
      }
    }
  };

  const handleDelete = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    valueSetter(updatedFiles);
  };

  return (
    <>
      <div
        className={`flex ${
          limit ? "" : "flex-col"
        } justify-center items-center relative w-full border `}
      >
        <p className="hidden mb-[0.8rem] ">
          {acceptedTypes
            ? `Les fichiers devraient correspondre à l'un des formats suivants :${acceptedTypes} `
            : ""}
        </p>
        <div className="flex flex-col justify-center items-center">
          <UploadOutlined className="w-[5.625rem] h-[5.625rem]  ml-[4rem] " />
          <p className="font-text mb-[5rem]  ">
            Cliquez pour choisir un fichier
          </p>
        </div>

        {/* Render a transparent file input over the Dragger component */}
        <input
          type="file"
          capture="user"
          accept=".png, .jpg, .jpeg, .svg, .pdf, .doc, .docx, .xls, .xlsx, .txt"
          onChange={handleFileChange}
          style={{
            zIndex: 1000,
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
        />
      </div>
      <div className="pt-[4.5rem]">
        <FilesPreviewer handleDelete={handleDelete} fileList={files} />
      </div>
      {error ? (
        <div>
          <p className="font-text text-[0.875rem] font-[500] leading-[1.375rem] text-[#C54141] lg:mb-[1.87rem] lg:text-[0.9375rem] lg:leading-[1.25rem]">
            Le fichier sélectionné n'est pas conforme au format de fichier
            accepté. Seuls les fichiers du type : {acceptedTypes} sont acceptés.
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
