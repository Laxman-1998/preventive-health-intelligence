"use client"

interface SignalScannerProps {
  data: any
  onContinue: () => void
}

export function SignalScanner({ data, onContinue }: SignalScannerProps) {

  const flags = data?.phii_result?.risk_flags || []

  const restart = () => {
    window.location.reload()
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">

      <div className="max-w-xl w-full rounded-xl border border-cyan-500/20 bg-black/40 p-8 backdrop-blur">

        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          Preventive Signal Detection
        </h2>

        <p className="text-sm text-muted-foreground mb-6">
          PHII has detected the following preventive health signals:
        </p>

        <div className="space-y-3">

          {flags.map((flag: string, i: number) => (
            <div
              key={i}
              className="border border-cyan-500/20 rounded-md p-3 text-sm text-foreground"
            >
              ✓ {flag}
            </div>
          ))}

        </div>

        <button
          onClick={onContinue}
          className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 text-black py-2 rounded-md"
        >
          Continue to Health Intelligence Dashboard
        </button>

        <button
          onClick={restart}
          className="mt-3 w-full border border-cyan-500/40 text-cyan-400 py-2 rounded-md text-sm hover:bg-cyan-500/10"
        >
          Start New Scan
        </button>

      </div>

    </div>
  )
}