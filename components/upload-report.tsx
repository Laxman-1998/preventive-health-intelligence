"use client"

import { GlassCard } from "./glass-card"
import { Upload } from "lucide-react"

export function UploadReport() {
  return (
    <GlassCard className="p-6">
      <h3 className="mb-4 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
        Upload Medical Report
      </h3>
      <div className="flex flex-col items-center rounded-lg border-2 border-dashed border-border/60 bg-background/20 px-6 py-8 transition-colors hover:border-neon-teal/30 hover:bg-neon-teal/5">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neon-teal/10">
          <Upload className="h-5 w-5 text-neon-teal" />
        </div>
        <p className="mb-1 text-sm font-medium text-foreground">
          Drop your report here
        </p>
        <p className="mb-4 text-xs text-muted-foreground">
          PDF, JPG, or PNG up to 10MB
        </p>
        <button className="rounded-md border border-neon-teal/30 bg-neon-teal/10 px-4 py-2 font-mono text-xs text-neon-teal transition-all hover:bg-neon-teal/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-teal">
          Browse Files
        </button>
      </div>
      <div className="mt-4 rounded-lg border border-border/30 bg-background/20 p-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
          Supported Reports
        </p>
        <div className="flex flex-wrap gap-2">
          {["Blood Panel", "Lipid Panel", "HbA1c", "CBC", "Metabolic"].map((type) => (
            <span
              key={type}
              className="rounded-md border border-border/40 bg-background/30 px-2 py-1 text-xs text-muted-foreground"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
