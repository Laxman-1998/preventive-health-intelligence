"use client"

import { GlassCard } from "./glass-card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type HealthTrajectoryProps = {
  score?: number
  flags?: string[]
}

function clamp(value: number) {
  if (isNaN(value)) return 50
  return Math.max(20, Math.min(100, value))
}

export function HealthTrajectory({ score = 50, flags = [] }: HealthTrajectoryProps) {

  let metabolicRisk = 0
  let cardiovascularRisk = 0
  let screeningRisk = 0

  flags.forEach((flag) => {
    const f = flag.toLowerCase()

    if (f.includes("hba1c")) metabolicRisk += 8
    if (f.includes("lipid")) cardiovascularRisk += 8
    if (f.includes("age")) screeningRisk += 6
  })

  const riskImpact =
    metabolicRisk +
    cardiovascularRisk +
    screeningRisk

  const trajectoryData = [
    {
      age: 30,
      optimal: 92,
      current: clamp(score + 10),
      projected: clamp(score + 6),
    },
    {
      age: 35,
      optimal: 90,
      current: clamp(score + 6),
      projected: clamp(score + 2 - riskImpact * 0.2),
    },
    {
      age: 40,
      optimal: 88,
      current: clamp(score),
      projected: clamp(score - 4 - riskImpact * 0.3),
    },
    {
      age: 45,
      optimal: 86,
      current: clamp(score - 4),
      projected: clamp(score - 8 - riskImpact * 0.4),
    },
    {
      age: 50,
      optimal: 84,
      current: clamp(score - 8),
      projected: clamp(score - 14 - riskImpact * 0.5),
    },
    {
      age: 55,
      optimal: 82,
      current: clamp(score - 12),
      projected: clamp(score - 20 - riskImpact * 0.6),
    },
    {
      age: 60,
      optimal: 80,
      current: clamp(score - 16),
      projected: clamp(score - 26 - riskImpact * 0.7),
    },
  ]

  return (
    <GlassCard className="p-6" glowColor="blue">

      <h3 className="mb-1 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
        Health Trajectory Simulation
      </h3>

      <p className="mb-4 text-xs text-muted-foreground/70">
        Projected vs optimal health pathway
      </p>

      <div className="h-52">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={trajectoryData}>

            <defs>

              <linearGradient id="optimalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0,240,255,0.06)"
            />

            <XAxis
              dataKey="age"
              stroke="#64748b"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              domain={[20, 100]}
            />

            <Tooltip
              formatter={(value: any) =>
                typeof value === "number" && !isNaN(value) ? value.toFixed(0) : "-"
              }
              contentStyle={{
                backgroundColor: "rgba(6,18,38,0.9)",
                border: "1px solid rgba(0,240,255,0.2)",
                borderRadius: "8px",
                color: "#e0f2fe",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="optimal"
              stroke="#00f0ff"
              fill="url(#optimalGrad)"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              animationDuration={900}
            />

            <Area
              type="monotone"
              dataKey="current"
              stroke="#0ea5e9"
              fill="none"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive
              animationDuration={900}
            />

            <Area
              type="monotone"
              dataKey="projected"
              stroke="#ef4444"
              fill="url(#projectedGrad)"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              dot={false}
              isAnimationActive
              animationDuration={900}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-3 flex items-center gap-4 text-xs font-mono">

        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-4 bg-neon-teal rounded" />
          <span className="text-muted-foreground">Optimal</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div style={{ borderTop: "1px dashed #0ea5e9", width: 16 }} />
          <span className="text-muted-foreground">Current</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="h-0.5 w-4 bg-red-400 rounded" />
          <span className="text-muted-foreground">Projected</span>
        </div>

      </div>

    </GlassCard>
  )
}