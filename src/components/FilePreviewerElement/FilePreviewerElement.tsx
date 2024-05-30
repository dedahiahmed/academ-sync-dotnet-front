import { imagesTypeList } from "@/data/data-base/file-types/file-types";
import { extensionChecker } from "@/utils/extension-checker/extension-checker";
import Image from "next/image";

export default function FilePreviewerElement({
  file,
}: Readonly<{ file: File }>) {
  const getFileExtension = (filename: string) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  const fileExtension = getFileExtension(file.name);

  const isImage = imagesTypeList.includes(fileExtension);
  const imageSrc = isImage
    ? URL.createObjectURL(file)
    : `/assets/extentions/${extensionChecker(fileExtension)}.svg`;
  const imageAlt = isImage ? "file Preview" : fileExtension;

  return (
    <div className="flex flex-1 flex-col gap-[0.5rem] overflow-hidden w-[10rem] items-center">
      <Image
        alt={imageAlt}
        width={50}
        height={50}
        className="h-[5rem] w-auto"
        src={imageSrc}
        quality={100}
      />
      <span className="h-[10rem] overflow-hidden overflow-ellipsis whitespace-nowrap">
        {file.name}
      </span>
    </div>
  );
}
