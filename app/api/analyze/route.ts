import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const response = await fetch(
      "https://isqt0fh2cf.execute-api.us-east-1.amazonaws.com/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: 45,
          years_since_hba1c: 3,
          lipid_profile_done: false
        })
      }
    )

    if (!response.ok) {
      throw new Error("External API request failed")
    }

    const data = await response.json()

    return NextResponse.json(data)

  } catch (error) {
    console.error("API error:", error)

    return NextResponse.json(
      { error: "API request failed" },
      { status: 500 }
    )
  }
}