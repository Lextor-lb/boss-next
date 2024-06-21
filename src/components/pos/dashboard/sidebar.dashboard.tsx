"use client";

import React, { useState } from "react";
import SidebarNavHeading from "@/components/SidebarNavHeading";
import { sidebarMenuItems } from "@/utils/constants";

export default function Sidebar() {
  // Filter routes based on group
  const filterRoutesByGroup = (group: string) =>
    sidebarMenuItems.filter((el) => el.group === group);

  // State for controlling open/close state
  const [open, setOpen] = useState(1);

  // Function to handle opening/closing of sidebar nav
  const handleOpen = (value: number) => () => {
    setOpen(open === value ? open : value);
  };

  // Define filtered routes
  const controlRoutes = filterRoutesByGroup("control");
  const reportRoutes = filterRoutesByGroup("report");
  const inventoryRoutes = filterRoutesByGroup("inventory");
  const CRMRoutes = filterRoutesByGroup("CRM");
  const profileRoutes = filterRoutesByGroup("profile");

  return (
    <div>
      <div className="space-y-3">
        <p className="text-xl mb-3 font-semibold">Boss Nation</p>
        <ul className="space-y-2">
          {/* Render SidebarNavHeading for control routes */}
          <SidebarNavHeading handleOpen={handleOpen} routes={controlRoutes} />

          {/* Render SidebarNavHeading for report routes */}
          <SidebarNavHeading
            open={open}
            openId={1}
            handleOpen={handleOpen}
            name={"Sale Report"}
            routes={reportRoutes}
          />

          {/* Render SidebarNavHeading for inventory routes */}
          <SidebarNavHeading
            open={open}
            openId={2}
            handleOpen={handleOpen}
            name={"Inventory"}
            routes={inventoryRoutes}
          />
          <SidebarNavHeading
            open={open}
            openId={3}
            handleOpen={handleOpen}
            name={"CRM"}
            routes={CRMRoutes}
          />
          <SidebarNavHeading
            open={open}
            openId={4}
            handleOpen={handleOpen}
            name={"User Profile"}
            routes={profileRoutes}
          />
        </ul>
      </div>
    </div>
  );
}
