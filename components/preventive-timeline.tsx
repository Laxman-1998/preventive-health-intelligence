"use client"

import { GlassCard } from "./glass-card"

const milestones = [
  { age: 25, label: "Baseline blood panel", status: "completed" },
  { age: 30, label: "Cardiovascular risk assessment", status: "completed" },
  { age: 35, label: "HbA1c / metabolic screening", status: "missed" },
  { age: 38, label: "Lipid panel baseline", status: "missed" },
  { age: 40, label: "Comprehensive metabolic panel", status: "upcoming" },
  { age: 45, label: "Cancer screening initiation", status: "upcoming" },
  { age: 50, label: "Colonoscopy baseline", status: "future" },
]

export function PreventiveTimeline() {
  return (
    <GlassCard className="p-6">
      <h3 className="mb-1 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
        Preventive Timeline
      </h3>
      <p className="mb-5 text-xs text-muted-foreground/70">
        Screening milestones by age
      </p>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {milestones.map((m) => (
            <div key={m.label} className="relative flex items-start gap-4 pl-1">
              {/* Node */}
              <div className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center">
                <div
                  className={`h-3 w-3 rounded-full border-2 ${
                    m.status === "completed"
                      ? "border-neon-teal bg-neon-teal/30 shadow-[0_0_6px_rgba(0,240,255,0.4)]"
                      : m.status === "missed"
                      ? "border-red-400 bg-red-400/20 shadow-[0_0_6px_rgba(248,113,113,0.4)]"
                      : m.status === "upcoming"
                      ? "border-amber-400 bg-amber-400/20"
                      : "border-muted-foreground/40 bg-transparent"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 pb-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-neon-teal">Age {m.age}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                      m.status === "completed"
                        ? "bg-neon-teal/10 text-neon-teal"
                        : m.status === "missed"
                        ? "bg-red-400/10 text-red-400"
                        : m.status === "upcoming"
                        ? "bg-amber-400/10 text-amber-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-foreground/80">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
