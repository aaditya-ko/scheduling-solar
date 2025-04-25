"use client"

import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { InstallationForm } from "@/components/installation-form"

export default function DashboardPage() {
  const [prediction, setPrediction] = useState({
    estimatedTime: "0 Hours, 0 Minutes",
    confidenceInterval: "±3.5 Hours",
    meanTime: 0,
    lowerBound: 0,
    upperBound: 0,
  })

  const [hasPrediction, setHasPrediction] = useState(false)

  // Listen for prediction updates from the form
  useEffect(() => {
    const handlePredictionUpdate = (event: CustomEvent) => {
      setPrediction(event.detail)
      setHasPrediction(true)
    }

    window.addEventListener("predictionUpdated", handlePredictionUpdate as EventListener)

    return () => {
      window.removeEventListener("predictionUpdated", handlePredictionUpdate as EventListener)
    }
  }, [])

  // Generate data for the confidence interval chart
  const confidenceData = Array.from({ length: 11 }, (_, i) => {
    const progress = i / 10
    return {
      progress,
      mean: prediction.meanTime,
      lower: prediction.lowerBound,
      upper: prediction.upperBound,
    }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Solar Installation Predictor</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Installation Parameters</h2>
          <InstallationForm />
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Estimated Time</h2>
            <div className="text-center">
              <p className={`text-3xl font-bold ${!hasPrediction ? "text-gray-400" : ""}`}>
                {prediction.estimatedTime}
              </p>
              <p className="text-sm text-gray-500 mt-1">Confidence Interval: {prediction.confidenceInterval}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Output Confidence</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={confidenceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="progress"
                    label={{ value: "Time Progress", position: "insideBottom", offset: -5 }}
                    tickFormatter={(value) => `${value * 100}%`}
                  />
                  <YAxis
                    label={{ value: "Hours", angle: -90, position: "insideLeft" }}
                    domain={[
                      hasPrediction ? Math.floor(prediction.lowerBound - 1) : 0,
                      hasPrediction ? Math.ceil(prediction.upperBound + 1) : 7,
                    ]}
                  />
                  <Tooltip
                    formatter={(value) => [`${value.toFixed(1)} hours`, ""]}
                    labelFormatter={(value) => `Progress: ${(Number(value) * 100).toFixed(0)}%`}
                  />
                  <Area
                    type="monotone"
                    dataKey="mean"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#colorConfidence)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                This chart shows the predicted installation time (blue line) with the confidence interval (shaded area).
                The actual installation time is likely to fall within this range with 95% confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
