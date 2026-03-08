"use client"

import { useState } from "react"
import { GlassCard } from "./glass-card"

interface Props {
  onAnalyze: (signals: any) => void
}

export function HealthInput({ onAnalyze }: Props) {

  const [age, setAge] = useState(40)
  const [sleep, setSleep] = useState(6)
  const [activity, setActivity] = useState("Moderate")
  const [yearsHbA1c, setYearsHbA1c] = useState(2)

  const handleAnalyze = () => {

    const signals = {
      age,
      sleep_hours: sleep,
      activity_level: activity,
      years_since_hba1c: yearsHbA1c,
      lipid_profile_done: false
    }

    onAnalyze(signals)
  }

  return (

    <div className="flex min-h-screen items-center justify-center px-6">

      <GlassCard className="p-8 max-w-xl w-full">

        <h2 className="text-xl font-semibold mb-6">
          Preventive Health Signals
        </h2>

        <p className="text-sm text-muted-foreground mb-6">
          Provide basic lifestyle signals or upload medical reports for analysis.
        </p>

        <div className="space-y-4">

          <div>
            <label className="text-xs font-mono">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
            />
          </div>

          <div>
            <label className="text-xs font-mono">Sleep Hours</label>
            <input
              type="number"
              value={sleep}
              onChange={(e) => setSleep(Number(e.target.value))}
              className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
            />
          </div>

          <div>
            <label className="text-xs font-mono">Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
            >
              <option>Sedentary</option>
              <option>Moderate</option>
              <option>Active</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono">
              Years Since HbA1c Test
            </label>
            <input
              type="number"
              value={yearsHbA1c}
              onChange={(e) => setYearsHbA1c(Number(e.target.value))}
              className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
            />
          </div>

        </div>

        <button
          onClick={handleAnalyze}
          className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 text-black py-2 rounded"
        >
          Analyze Preventive Signals
        </button>

      </GlassCard>

    </div>

  )
}