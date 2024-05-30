import { supabase } from "@/utils/supabase/supabase";
import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
export default function NotificationBadge() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [unseenCourses, setUnseenCourses] = useState<any[]>([]);
  useEffect(() => {
    const handleInserts = (payload: any) => {
      console.log("Change received!", payload.new);
      const newCourse = payload.new;
      setNotificationCount((prevCount) => prevCount + 1);
      setUnseenCourses((prevCourses) => [...prevCourses, newCourse]);

      const audio = new Audio(
        "https://xqlrxukupuyiexfxakcc.supabase.co/storage/v1/object/public/sound/notification-pretty-good.mp3"
      );
      audio.play();
    };
    console.log("setUnseenCourses", unseenCourses);
    supabase
      .channel("course-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "course" },
        handleInserts
      )
      .subscribe();
  }, []);
  const handleNotificationClick = () => {
    setNotificationCount(0);
  };

  const menu = (
    <Menu>
      {unseenCourses.map((course) => (
        <Menu.Item key={course.id}>
          <a href="/course">{course.title}</a>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <>
      {" "}
      <Dropdown overlay={menu} trigger={["click"]}>
        <button className="relative" onClick={handleNotificationClick}>
          <IoNotifications className="text-sky-600 text-3xl" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs font-semibold rounded-full px-1">
              {notificationCount}
            </span>
          )}
        </button>
      </Dropdown>
    </>
  );
}
