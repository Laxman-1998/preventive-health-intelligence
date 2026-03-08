"use client"

import { PhiiScoreGauge } from "./phii-score-gauge"
import { PreventiveBlindspots } from "./preventive-blindspots"
import { HealthTrajectory } from "./health-trajectory"
import { RiskRadar } from "./risk-radar"
import { AiInsight } from "./ai-insight"
import { PreventiveTimeline } from "./preventive-timeline"
import { UploadReport } from "./upload-report"
import { Activity, Shield } from "lucide-react"

type DashboardProps = {
  data?: any
}

export function Dashboard({ data }: DashboardProps) {

  const timestamp = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">

      {/* Header */}

      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="flex items-center gap-3 mb-1">

            <h1
              className="text-2xl font-bold tracking-tight"
              style={{
                background: "linear-gradient(180deg,#00f0ff 0%,#0ea5e9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PHII
            </h1>

            <div className="h-4 w-px bg-border" />

            <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Health Intelligence Control Center
            </span>

          </div>

          <p className="text-xs text-muted-foreground">
            Preventive health analysis generated on {timestamp}
          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-1.5">
            <Activity className="h-3.5 w-3.5 text-neon-teal" />
            <span className="font-mono text-xs text-neon-teal">Live</span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-1.5">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-mono text-xs text-emerald-400">Encrypted</span>
          </div>

        </div>

      </header>

      {/* Dashboard Grid */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        <div className="space-y-4">
          <PhiiScoreGauge score={data?.phii_result?.phii_score || 0} />
          <PreventiveBlindspots />
        </div>

        <div className="space-y-4">
          <HealthTrajectory
            score={data?.phii_result?.phii_score}
            flags={data?.phii_result?.risk_flags}
          />
          <RiskRadar flags={data?.phii_result?.risk_flags || []} />
        </div>

        <div className="space-y-4">
          <AiInsight
            explanation={data?.ai_explanation}
            flags={data?.phii_result?.risk_flags || []}
          />

          {/* Report Upload */}

          <div>
            <UploadReport />

            <div className="mt-3 rounded-md border border-border/40 bg-card/40 p-3">

              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Prototype Feature
              </span>

              <p className="mt-1 text-xs text-muted-foreground">
                Future PHII versions will allow secure upload of medical
                reports. AI will extract biomarkers such as HbA1c, LDL
                cholesterol, glucose levels, and screening history to
                generate longitudinal preventive health intelligence.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Timeline */}

      <div className="mt-4">
        <PreventiveTimeline />
      </div>

      {/* Footer */}

      <footer className="mt-8 border-t border-border/30 pt-4">

        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">

          <p className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider">
            PHII v1.0 - Preventive Health Intelligence Interface
          </p>

          <p className="font-mono text-[10px] text-muted-foreground/40">
            Data is simulated for demonstration purposes
          </p>

        </div>

      </footer>

    </div>
  )
}