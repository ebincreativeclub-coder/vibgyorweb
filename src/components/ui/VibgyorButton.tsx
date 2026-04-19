"use client";

import Link from "next/link";
import React from "react";

interface VibgyorButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "dark" | "outline";
  className?: string;
}

export function VibgyorButton({ 
  href, 
  children, 
  variant = "light", 
  className = "" 
}: VibgyorButtonProps) {
  
  let buttonStyles = "";
  let circleStyles = "";
  let arrowStyles = "";

  // Switch between the three button themes used across the homepage
  switch (variant) {
    case "light":
      // Used in the Dark Services section
      buttonStyles = "bg-white text-[#16232A] shadow-lg hover:shadow-xl";
      circleStyles = "bg-[#16232A]";
      arrowStyles = "text-white";
      break;
    case "dark":
      // Used in the Hero section
      buttonStyles = "bg-[#16232A] text-white shadow-lg hover:shadow-xl";
      circleStyles = "bg-white";
      arrowStyles = "text-[#16232A]";
      break;
    case "outline":
      // Used in the Features section
      buttonStyles = "bg-transparent border border-[#16232A]/20 text-[#16232A] hover:border-[#16232A]";
      circleStyles = "bg-[#16232A]";
      arrowStyles = "text-white";
      break;
  }

  return (
    <Link 
      href={href} 
      className={`inline-flex items-center justify-between h-[39px] pl-6 pr-1 rounded-full group/btn transition-all duration-300 hover:pr-2 cursor-pointer ${buttonStyles} ${className}`}
    >
      <span className="text-ui-xs font-medium whitespace-nowrap mr-4">
        {children}
      </span>
      
      <div className={`w-[31px] h-[31px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover/btn:rotate-45 ${circleStyles}`}>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={arrowStyles}>
          <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  );
}