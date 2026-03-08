"use client"

import { GlassCard } from "./glass-card"
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts"

type RiskRadarProps = {
  flags?: string[]
}

export function RiskRadar({ flags = [] }: RiskRadarProps) {

  const scores = {
    Metabolic: 35,
    Cardiovascular: 40,
    Screening: 30,
    Lifestyle: 40,
    Awareness: 35,
  }

  flags.forEach((flag) => {
    const f = flag.toLowerCase()

    if (f.includes("hba1c") || f.includes("metabolic")) {
      scores.Metabolic += 20
      scores.Screening += 10
    }

    if (f.includes("lipid")) {
      scores.Cardiovascular += 20
    }

    if (f.includes("age")) {
      scores.Awareness += 15
    }
  })

  const riskData = [
    { dimension: "Metabolic", value: scores.Metabolic, fullMark: 100 },
    { dimension: "Cardiovascular", value: scores.Cardiovascular, fullMark: 100 },
    { dimension: "Screening", value: scores.Screening, fullMark: 100 },
    { dimension: "Lifestyle", value: scores.Lifestyle, fullMark: 100 },
    { dimension: "Awareness", value: scores.Awareness, fullMark: 100 },
  ]

  return (
    <GlassCard className="p-6">
      <h3 className="mb-1 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
        Global Preventive Risk Radar
      </h3>

      <p className="mb-2 text-xs text-muted-foreground/70">
        Multi-dimensional risk analysis
      </p>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={riskData}>
            <PolarGrid stroke="rgba(0,240,255,0.1)" />

            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fontSize: 10, fill: "#64748b" }}
            />

            <Radar
              name="Risk"
              dataKey="value"
              stroke="#00f0ff"
              fill="#00f0ff"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {riskData.map((d) => (
          <div key={d.dimension} className="flex items-center gap-2 text-xs">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  d.value < 40
                    ? "#ef4444"
                    : d.value < 60
                      ? "#f59e0b"
                      : "#00f0ff",
                boxShadow: `0 0 4px ${d.value < 40
                    ? "rgba(239,68,68,0.5)"
                    : d.value < 60
                      ? "rgba(245,158,11,0.5)"
                      : "rgba(0,240,255,0.5)"
                  }`,
              }}
            />
            <span className="text-muted-foreground">
              {d.dimension}: <span className="text-foreground">{d.value}%</span>
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}