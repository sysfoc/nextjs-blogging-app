import React from "react";
import Popular from "@/app/(public)/components/sidebar/Popular";
import Recent from "@/app/(public)/components/sidebar/Recent";
import Topics from "@/app/(public)/components/sidebar/Topics";
import Newsletter from "@/app/(public)/components/sidebar/Newsletter";
import Tags from "@/app/(public)/components/sidebar/Tags";

const Sidebar = () => {
  return (
    <aside className='hidden md:flex md:w-[32%] flex-col gap-y-8'>
      <Popular />
      <Recent />
      <Topics />
      <Newsletter />
      <Tags />
    </aside>
  );
};

export default Sidebar;
