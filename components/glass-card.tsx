"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  glowColor?: "teal" | "blue"
}

export function GlassCard({ children, className, glowColor = "teal" }: GlassCardProps) {
  const glowStyles =
    glowColor === "teal"
      ? "shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]"
      : "shadow-[0_0_15px_rgba(14,165,233,0.15)] hover:shadow-[0_0_25px_rgba(14,165,233,0.25)]"

  const borderStyles =
    glowColor === "teal"
      ? "border-[rgba(0,240,255,0.2)]"
      : "border-[rgba(14,165,233,0.2)]"

  return (
    <div
      className={cn(
        "relative rounded-xl border backdrop-blur-xl transition-shadow duration-300",
        "bg-[rgba(6,18,38,0.6)]",
        borderStyles,
        glowStyles,
        className
      )}
    >
      {children}
    </div>
  )
}
