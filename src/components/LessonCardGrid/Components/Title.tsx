import React, { ReactNode, HTMLProps } from "react";

interface TitleProps extends HTMLProps<HTMLHeadingElement> {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children, className, ...props }) => (
  <h3
    {...props}
    className={`${className || ""} block text-gray-800 dark:text-gray-50 text-lg font-medium`}
  >
    {children}
  </h3>
);

export default Title;
