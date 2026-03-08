"use client"

import { GlassCard } from "./glass-card"
import { AlertTriangle } from "lucide-react"

const BLINDSPOTS = [
  {
    label: "HbA1c monitoring gap",
    severity: "high",
    description: "No HbA1c test recorded in 18+ months",
  },
  {
    label: "No lipid baseline",
    severity: "medium",
    description: "Lipid panel baseline not established",
  },
  {
    label: "Age metabolic window",
    severity: "low",
    description: "Critical metabolic screening window approaching",
  },
]

export function PreventiveBlindspots() {
  return (
    <GlassCard className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Preventive Blindspots
        </h3>
      </div>
      <div className="space-y-3">
        {BLINDSPOTS.map((spot) => (
          <div
            key={spot.label}
            className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/30 p-3"
          >
            <div
              className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                spot.severity === "high"
                  ? "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.5)]"
                  : spot.severity === "medium"
                  ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                  : "bg-neon-teal shadow-[0_0_6px_rgba(0,240,255,0.5)]"
              }`}
            />
            <div>
              <p className="text-sm font-medium text-foreground">{spot.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{spot.description}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
