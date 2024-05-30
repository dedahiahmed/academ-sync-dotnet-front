import React, { ReactNode, HTMLProps } from "react";

interface SubTitleProps extends HTMLProps<HTMLSpanElement> {
  children: ReactNode;
}

const SubTitle: React.FC<SubTitleProps> = ({ children, className }) => (
  <span
    className={`${className || ""} text-blue-600 dark:text-sky-500 font-semibold`}
  >
    {children}
  </span>
);

export default SubTitle;
