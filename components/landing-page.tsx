"use client"

interface LandingPageProps {
  onStartScan: () => void
}

export function LandingPage({ onStartScan }: LandingPageProps) {

  const handleClick = () => {
    onStartScan()
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6">

      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 50% 45%, rgba(0,240,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-2xl">

        {/* PHII Title */}
        <h1
          className="text-7xl font-bold tracking-tight sm:text-8xl lg:text-9xl"
          style={{
            background: "linear-gradient(180deg, #00f0ff 0%, #0ea5e9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 30px rgba(0,240,255,0.3))",
          }}
        >
          PHII
        </h1>

        <h2 className="mt-6 text-lg font-medium text-foreground sm:text-xl">
          Preventive Health Intelligence Interface
        </h2>

        {/* FIXED: One-line tagline */}
        <p className="mt-4 text-sm text-muted-foreground">
          Most healthcare begins after symptoms appear.{" "}
          <span className="text-cyan-400 font-medium">
            PHII begins years earlier.
          </span>
        </p>

        {/* Start Button */}
        <button
          onClick={handleClick}
          className="mt-10 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-8 py-3 font-mono text-sm tracking-wide text-cyan-400 transition-all duration-300 hover:bg-cyan-400/20"
        >
          Start Preventive Scan
        </button>

        {/* Status */}
        <div className="mt-16 flex items-center justify-center gap-8 text-xs font-mono text-muted-foreground">

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>Systems Online</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            <span>AI Engine Ready</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Secure</span>
          </div>

        </div>

      </div>

    </div>
  )
}