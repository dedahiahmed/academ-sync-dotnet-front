import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";

import { access } from "fs";
import { getCurrentUser } from "@/utils/user-me/userme";
import { accessToken } from "@/utils/token/token";

export default function CourseDropDown() {
  const [state, setState] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // State to store user's role

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the current user's data
        const userData = await getCurrentUser();
        // Update the role state
        setUserRole(userData.role);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    // Call the async function
    fetchUserData();
  }, []);

  const handleNavigation = (path: string) => {
    window.location.href = path; // Redirect using anchor tag
  };

  const handleGestionCoursClick = () => {
    // Check if the user is a teacher or admin, if yes, redirect them to "/gestion-cours"
    if (userRole === "TEACHER" || userRole === "ADMIN") {
      handleNavigation("/gestion-cours");
    } else {
      // Display a modal informing the user that only teachers or admins have access
      const modal = document.getElementById(
        "teacher-require-modal"
      ) as HTMLDialogElement | null;
      if (modal) {
        modal.showModal();
      }
    }
  };
  const handleLireCoursClick = () => {
    // Check if the user is a teacher or admin, if yes, redirect them to "/gestion-cours"
    if (userRole === "STUDENT" || userRole === "ADMIN") {
      handleNavigation("/course");
    } else {
      // Display a modal informing the user that only teachers or admins have access
      const modal = document.getElementById(
        "teacher-require-modal"
      ) as HTMLDialogElement | null;
      if (modal) {
        modal.showModal();
      }
    }
  };
  const coursMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleGestionCoursClick()}>
        Gestion des cours
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleLireCoursClick()}>
        Lire le cours
      </Menu.Item>
    </Menu>
  );

  // Function to handle the click on "Gestion des cours" menu item

  return (
    <div>
      <Dropdown overlay={coursMenu} className="flex flex-row">
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Cours
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-4 h-4 ml-1 mt-0.5 transition-transform ${
              state ? "transform rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M4.293 7.293a1 1 0 011.414 0L12 13.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </Dropdown>
    </div>
  );
}
