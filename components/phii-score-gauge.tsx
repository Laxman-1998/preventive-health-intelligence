"use client"

import { useEffect, useState } from "react"
import { GlassCard } from "./glass-card"

type GaugeProps = {
  score: number
}

export function PhiiScoreGauge({ score }: GaugeProps) {

  const [displayScore, setDisplayScore] = useState(0)

  const targetScore = score
  const maxScore = 100

  useEffect(() => {

    let start = 0

    const duration = 1200
    const increment = targetScore / (duration / 16)

    const timer = setInterval(() => {

      start += increment

      if (start >= targetScore) {
        start = targetScore
        clearInterval(timer)
      }

      setDisplayScore(Math.round(start))

    }, 16)

    return () => clearInterval(timer)

  }, [targetScore])

  const radius = 70

  const circumference = 2 * Math.PI * radius * (270 / 360)

  const strokeDashoffset =
    circumference - (displayScore / maxScore) * circumference

  const getColor = () => {
    if (displayScore < 30) return "#ef4444"
    if (displayScore < 60) return "#f59e0b"
    return "#00f0ff"
  }

  return (

    <GlassCard className="p-6">

      <h3 className="mb-1 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
        PHII Score
      </h3>

      <div className="relative flex items-center justify-center mt-6">

        <svg width="180" height="120">

          <path
            d="M20 100 A70 70 0 0 1 160 100"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
          />

          <path
            d="M20 100 A70 70 0 0 1 160 100"
            fill="none"
            stroke={getColor()}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.2s ease"
            }}
          />

        </svg>

        <div className="absolute flex flex-col items-center">

          <span className="text-4xl font-semibold">
            {displayScore}
          </span>

          <span className="text-xs text-muted-foreground">
            / 100
          </span>

        </div>

      </div>

      <p className="mt-4 text-xs font-mono tracking-wide text-muted-foreground">

        {displayScore < 30 && "High Preventive Risk"}

        {displayScore >= 30 && displayScore < 60 &&
          "Moderate Preventive Visibility"}

        {displayScore >= 60 && "Strong Preventive Intelligence"}

      </p>

    </GlassCard>

  )

}