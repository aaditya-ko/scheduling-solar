"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ConfidenceIntervalChart } from "@/components/confidence-interval-chart"

interface PredictionData {
  estimatedTime: string
  confidenceInterval: string
  meanTime: number
  lowerBound: number
  upperBound: number
}

export function InstallationResults() {
  const [prediction, setPrediction] = useState<PredictionData | null>(null)

  useEffect(() => {
    // Listen for the custom event from the form component
    const handlePredictionUpdate = (event: CustomEvent<PredictionData>) => {
      setPrediction(event.detail)
    }

    window.addEventListener("predictionUpdated", handlePredictionUpdate as EventListener)

    // For demo purposes, set initial prediction data
    setPrediction({
      estimatedTime: "10 Hours, 30 Minutes",
      confidenceInterval: "±2 Hours",
      meanTime: 10.5,
      lowerBound: 8.5,
      upperBound: 12.5,
    })

    return () => {
      window.removeEventListener("predictionUpdated", handlePredictionUpdate as EventListener)
    }
  }, [])

  if (!prediction) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">
            Enter installation parameters and click "Generate Prediction" to see results.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-muted-foreground">Estimated Time</h3>
            <p className="text-3xl font-bold mt-2">{prediction.estimatedTime}</p>
            <p className="text-sm text-muted-foreground mt-1">Confidence Interval: {prediction.confidenceInterval}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Output Confidence</h3>
          <ConfidenceIntervalChart
            meanTime={prediction.meanTime}
            lowerBound={prediction.lowerBound}
            upperBound={prediction.upperBound}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              This chart shows the predicted installation time (blue line) with the confidence interval (shaded area).
              The actual installation time is likely to fall within this range with 95% confidence.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
