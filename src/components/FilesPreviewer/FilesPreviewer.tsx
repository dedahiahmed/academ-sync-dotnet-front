"use client";

import { Button } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import FilePreviewerElement from "../FilePreviewerElement/FilePreviewerElement";
export default function FilesPreviewer({
  fileList,
  handleDelete,
}: Readonly<{
  fileList: File[];
  handleDelete: (index: number) => void;
}>) {
  return (
    <div className="flex gap-[1.5rem] flex-wrap ">
      {fileList.map((file, index) => {
        return (
          <div
            key={index}
            className="flex gap-[0.5rem]  py-[1.5rem] w-[15rem] h-[15rem] justify-between items-center"
          >
            <div className="flex gap-[0.5rem]">
              <FilePreviewerElement file={file} />
              <Button
                className="relative top-0 left-0"
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(index)}
              ></Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
