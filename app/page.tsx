"use client"

import { useState, useCallback, useEffect } from "react"

import { ParticleBackground } from "@/components/particle-background"
import { LandingPage } from "@/components/landing-page"
import { ScanAnimation } from "@/components/scan-animation"
import { Dashboard } from "@/components/dashboard"
import { SignalScanner } from "@/components/signal-scanner"
import { HealthInput } from "@/components/health-input"

type AppState =
  | "landing"
  | "input"
  | "scanning"
  | "signals"
  | "dashboard"

type AnalysisResult = {
  phii_result?: {
    phii_score?: number
    risk_flags?: string[]
  }
  ai_explanation?: string
}

export default function Page() {

  const [state, setState] = useState<AppState>("landing")

  const [analysis, setAnalysis] =
    useState<AnalysisResult | null>(null)

  const [signals, setSignals] = useState<any>(null)

  const [scanExecuted, setScanExecuted] = useState(false)

  /**
   * Restore dashboard if page refreshes
   */
  useEffect(() => {

    const saved = sessionStorage.getItem("phii_analysis")

    if (saved) {

      const parsed = JSON.parse(saved)

      setAnalysis(parsed)

      setState("dashboard")

    }

  }, [])

  /**
   * Start scan → go to input screen
   */
  const handleStartScan = useCallback(() => {

    setState("input")

  }, [])

  /**
   * User submits health signals
   */
  const handleAnalyze = (userSignals: any) => {

    setSignals(userSignals)

    setState("scanning")

  }

  /**
   * Scan animation completed
   */
  const handleScanComplete = useCallback(async () => {

    if (!signals || scanExecuted) return

    setScanExecuted(true)

    try {

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signals)
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }

      const result = await response.json()

      console.log("PHII API Response:", result)

      setAnalysis(result)

      /**
       * Save result for refresh persistence
       */
      sessionStorage.setItem(
        "phii_analysis",
        JSON.stringify(result)
      )

      setState("signals")

    }
    catch (error) {

      console.error("API error:", error)

      setState("dashboard")

    }

  }, [signals, scanExecuted])

  /**
   * Restart the demo and return to landing page
   */
  const handleRestart = () => {

    sessionStorage.removeItem("phii_analysis")

    setSignals(null)

    setAnalysis(null)

    setScanExecuted(false)

    setState("landing")

  }

  return (

    <main className="relative min-h-screen overflow-x-hidden">

      <ParticleBackground />

      <div className="relative z-10">

        {state === "landing" &&
          <LandingPage onStartScan={handleStartScan} />
        }

        {state === "input" &&
          <HealthInput onAnalyze={handleAnalyze} />
        }

        {state === "scanning" &&
          <ScanAnimation onComplete={handleScanComplete} />
        }

        {state === "signals" && analysis &&
          <SignalScanner
            data={analysis}
            onContinue={() => setState("dashboard")}
          />
        }

        {state === "dashboard" && analysis &&
          <Dashboard
            data={analysis}
            onRestart={handleRestart}
          />
        }

      </div>

    </main>

  )
}