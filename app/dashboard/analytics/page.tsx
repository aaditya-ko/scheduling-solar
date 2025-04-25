"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function AnalyticsPage() {
  // Sample data for analytics
  const monthlyData = [
    { month: "Jan", predicted: 120, actual: 125 },
    { month: "Feb", predicted: 150, actual: 148 },
    { month: "Mar", predicted: 180, actual: 190 },
    { month: "Apr", predicted: 170, actual: 165 },
    { month: "May", predicted: 200, actual: 195 },
    { month: "Jun", predicted: 220, actual: 230 },
  ]

  const factorData = [
    { factor: "Roof Pitch", impact: 25 },
    { factor: "Weather", impact: 40 },
    { factor: "Team Size", impact: 30 },
    { factor: "Panel Count", impact: 35 },
    { factor: "Drive Time", impact: 20 },
    { factor: "Roof Azimuth", impact: 15 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Comparison */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Predicted vs. Actual Installation Times</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => [`${value} hours`, ""]} />
                <Legend />
                <Bar dataKey="predicted" name="Predicted Time" fill="#3b82f6" />
                <Bar dataKey="actual" name="Actual Time" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Factor Impact */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Factors Impacting Installation Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={factorData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: "Impact Score", position: "insideBottom", offset: -5 }} />
                <YAxis dataKey="factor" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="impact" name="Impact Score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Model Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Mean Absolute Error</h3>
            <p className="mt-1 text-3xl font-semibold">1.2 hours</p>
            <p className="mt-1 text-sm text-gray-500">Average difference between predicted and actual times</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Prediction Accuracy</h3>
            <p className="mt-1 text-3xl font-semibold">87%</p>
            <p className="mt-1 text-sm text-gray-500">Percentage of predictions within confidence interval</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Model Confidence</h3>
            <p className="mt-1 text-3xl font-semibold">95%</p>
            <p className="mt-1 text-sm text-gray-500">Statistical confidence level of predictions</p>
          </div>
        </div>
      </div>
    </div>
  )
}
