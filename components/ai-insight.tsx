"use client"

import { useState } from "react"
import { GlassCard } from "./glass-card"
import { Brain } from "lucide-react"

type InsightProps = {
  explanation?: string
  flags?: string[]
}

export function AiInsight({ explanation, flags = [] }: InsightProps) {

  const [expanded, setExpanded] = useState(false)

  const previewLength = 350

  const cleanText = explanation
    ?.replace(/###\s*/g, "")
    ?.replace(/\*\*/g, "")
    ?.replace(/---/g, "")

  const preview =
    cleanText && cleanText.length > previewLength
      ? cleanText.slice(0, previewLength) + "..."
      : cleanText

  return (
    <GlassCard className="p-6">

      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-4 w-4 text-neon-teal" />

        <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
          AI Preventive Insight
        </h3>
      </div>

      <div className="space-y-4">

        <div className="rounded-lg border border-neon-teal/10 bg-neon-teal/5 p-4">

          {cleanText ? (

            <>

              <div className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {expanded ? cleanText : preview}
              </div>

              {cleanText.length > previewLength && (

                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-2 text-xs font-mono text-neon-teal hover:underline"
                >
                  {expanded ? "Show less" : "Read more"}
                </button>

              )}

            </>

          ) : (

            <p className="text-sm text-muted-foreground">
              Generating AI preventive health insight...
            </p>

          )}

        </div>

        <div className="space-y-2">

          <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Recommended Actions
          </h4>

          <ul className="space-y-2">

            {[
              "Schedule baseline HbA1c test within 30 days",
              "Establish lipid panel baseline for trend analysis",
              "Begin cardiovascular screening protocol",
            ].map((action) => (

              <li
                key={action}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neon-teal" />
                {action}
              </li>

            ))}

          </ul>

        </div>

      </div>

    </GlassCard>
  )
}