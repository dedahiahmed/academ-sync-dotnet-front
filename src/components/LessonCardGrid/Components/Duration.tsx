import React, { ReactNode, HTMLProps } from "react";

interface DurationProps extends HTMLProps<HTMLSpanElement> {
  children: ReactNode;
}

const Duration: React.FC<DurationProps> = ({
  children,
  className,
  ...props
}) => (
  <span
    {...props}
    className={`text-sm text-gray-700 dark:text-gray-400 font-semibold ${className || ""}`}
  >
    {children}
  </span>
);

export default Duration;
