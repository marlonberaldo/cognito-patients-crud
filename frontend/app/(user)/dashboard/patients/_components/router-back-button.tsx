"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { ChevronLeft } from "lucide-react";

interface IRouterBackButton {
  children?: React.ReactNode;
  className?: string;
}

const RouterBackButton = ({ children, className }: IRouterBackButton) => {
  const { back } = useRouter();

  return (
    <button onClick={() => back()} className={cn("flex items-center gap-x-2 group", className)}>
      <ChevronLeft className="text-_blue size-6 transition-all group-hover:-translate-x-1" />
      {children}
    </button>
  );
};

export default RouterBackButton;