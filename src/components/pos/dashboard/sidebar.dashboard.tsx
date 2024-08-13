"use client";

import React, { useEffect, useState } from "react";
import SidebarNavHeading from "@/components/SidebarNavHeading";
import { sidebarMenuItems } from "@/utils/constants";

export default function Sidebar() {
  // Filter routes based on group
  const filterRoutesByGroup = (group: string) =>
    sidebarMenuItems.filter((el) => el.group === group);

  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Only set the open state if we are on the client side
    if (typeof window !== "undefined") {
      setOpen(localStorage.getItem("open"));
    }
  }, []);

  // Function to handle opening/closing of sidebar nav
  const handleOpen = (value: string) => () => {
    setOpen(open === value ? open : value);
    if (isClient) {
      localStorage.setItem("open", value);
    }
  };

  // Define filtered routes
  const controlRoutes = filterRoutesByGroup("control");
  const reportRoutes = filterRoutesByGroup("report");
  const inventoryRoutes = filterRoutesByGroup("inventory");
  const CRMRoutes = filterRoutesByGroup("CRM");
  const profileRoutes = filterRoutesByGroup("profile");
  const stockRoutes = filterRoutesByGroup("stock");
  const EcommerceRoutes = filterRoutesByGroup("Ecommerce");

  const sidebarNavHeading = [
    {
      id: 0,
      name: "",
      routes: controlRoutes,
    },
    {
      id: 1,
      name: "Sale Report",
      routes: reportRoutes,
    },
    {
      id: 2,
      name: "Inventory",
      routes: inventoryRoutes,
    },
    {
      id: 3,
      name: "CRM",
      routes: CRMRoutes,
    },
    {
      id: 4,
      name: "stock",
      routes: stockRoutes,
    },
    {
      id: 5,
      name: "Ecommerce",
      routes: EcommerceRoutes,
    },
    {
      id: 6,
      name: "User Profile",
      routes: profileRoutes,
    },
  ];

  return (
    <div className="space-y-3">
      <p className="text-xl mb-3 font-semibold">Boss Nation</p>
      <ul className="space-y-2">
        {sidebarNavHeading.map(({ id, name, routes }) => {
          if (name === "") {
            return (
              <SidebarNavHeading
                key={id}
                handleOpen={handleOpen}
                routes={routes}
              />
            );
          }
          return (
            <SidebarNavHeading
              key={id}
              open={open}
              openId={id}
              handleOpen={handleOpen}
              name={name}
              routes={routes}
            />
          );
        })}
      </ul>
    </div>
  );
}
