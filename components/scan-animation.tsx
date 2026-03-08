"use client"

import { useEffect, useState } from "react"

const SCAN_STEPS = [
  "Initializing PHII intelligence engine",
  "Scanning preventive signals",
  "Detecting screening gaps",
  "Simulating health trajectory",
  "Generating preventive intelligence",
]

interface ScanAnimationProps {
  onComplete: () => void
}

export function ScanAnimation({ onComplete }: ScanAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepDuration = 1200
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = ((currentStep + 1) / SCAN_STEPS.length) * 100
        if (prev < target) return Math.min(prev + 2, target)
        return prev
      })
    }, 30)

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= SCAN_STEPS.length - 1) {
          clearInterval(stepTimer)
          clearInterval(progressInterval)
          setTimeout(onComplete, 800)
          return prev
        }
        return prev + 1
      })
    }, stepDuration)

    return () => {
      clearInterval(stepTimer)
      clearInterval(progressInterval)
    }
  }, [onComplete, currentStep])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block">
            <div className="relative h-20 w-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-neon-teal opacity-30 animate-ping" />
              <div className="absolute inset-2 rounded-full border border-neon-teal opacity-60 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-neon-teal/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-neon-teal">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <h2 className="font-mono text-sm tracking-[0.3em] uppercase text-neon-teal mb-1">
            PHII Scan in Progress
          </h2>
        </div>

        <div className="space-y-3 mb-10">
          {SCAN_STEPS.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-3 font-mono text-sm transition-all duration-500 ${
                i < currentStep
                  ? "text-neon-teal opacity-100"
                  : i === currentStep
                  ? "text-foreground opacity-100"
                  : "text-muted-foreground opacity-30"
              }`}
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                {i < currentStep ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : i === currentStep ? (
                  <div className="h-2 w-2 rounded-full bg-neon-teal animate-pulse" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                )}
              </div>
              {step}
            </div>
          ))}
        </div>

        <div className="relative h-1 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-neon-teal transition-all duration-300"
            style={{ width: `${progress}%`, boxShadow: "0 0 10px rgba(0, 240, 255, 0.5)" }}
          />
        </div>
        <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
          {Math.round(progress)}% complete
        </p>
      </div>
    </div>
  )
}
