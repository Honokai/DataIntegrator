"use client";

import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, MonitorCog, ShieldUser } from "lucide-react";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <nav className="p-2">
      <div className="flex flex-col">
        <Button
          className="p-0"
          size="icon"
          variant="ghost"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ArrowLeft /> : <ArrowRight rotate={90} />}
        </Button>
      </div>
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } overflow-hidden transition-all duration-300 z-50`}
      >
        <ThemeToggle />
        <ul className="p-9 [&>li]:mt-4">
          <li className="flex gap-2">
            <MonitorCog /> Machines
          </li>
          <li className="flex gap-2">
            <ShieldUser /> Users
          </li>
        </ul>
      </div>
    </nav>
  );
}
