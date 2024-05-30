import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  scroll?: boolean; // Define the scroll prop
}

const NavLink: React.FC<NavLinkProps> = ({ children, href, ...props }) => (
  <Link href={href}>
    <div
      {...props}
      className={`py-2.5 px-4 text-center rounded-lg duration-150 ${props.className || ""}`}
    >
      {children}
    </div>
  </Link>
);

export default NavLink;
