"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function InstallationForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    driveTime: "",
    numEmployees: "",
    roofPitch: "",
    numSolarPanels: "",
    panelLength: "", // This maps to panelWidth in the model
    panelHeight: "",
    panelWeight: "",
    powerRating: "",
    numStories: "",
    season: "",
    isSquirrelScreen: false,
    inclementWeather: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Sending data to backend:", formData)

      // Send the form data to our API route
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API request failed with status ${response.status}`)
      }

      const result = await response.json()
      console.log("Received response from backend:", result)

      // Get the predicted time in minutes from the result
      const totalMinutes = result.predictedTime
      const hours = Math.floor(totalMinutes / 60)
      const minutes = Math.round(totalMinutes % 60)

      // Format the time string
      const estimatedTime = `${hours} ${hours === 1 ? "Hour" : "Hours"}, ${minutes} ${minutes === 1 ? "Minute" : "Minutes"}`

      // Trigger a custom event that the results component will listen for
      const event = new CustomEvent("predictionUpdated", {
        detail: {
          estimatedTime: estimatedTime,
          confidenceInterval: "±3.5 Hours",
          meanTime: totalMinutes / 60, // Convert to hours for the chart
          lowerBound: totalMinutes / 60 - 3.5,
          upperBound: totalMinutes / 60 + 3.5,
        },
      })
      window.dispatchEvent(event)

      toast({
        title: "Prediction generated",
        description: "Your installation time prediction has been updated.",
      })
    } catch (error) {
      console.error("Error during prediction:", error)
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Failed to generate prediction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="driveTime">Drive Time (minutes)</Label>
              <Input
                id="driveTime"
                name="driveTime"
                type="number"
                placeholder="30"
                min="0"
                value={formData.driveTime}
                onChange={handleChange}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numEmployees">Number of Employees</Label>
              <Input
                id="numEmployees"
                name="numEmployees"
                type="number"
                placeholder="3"
                min="0"
                value={formData.numEmployees}
                onChange={handleChange}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roofPitch">Roof Pitch (degrees)</Label>
              <Input
                id="roofPitch"
                name="roofPitch"
                type="number"
                step="0.1"
                placeholder="30"
                min="0"
                max="90"
                value={formData.roofPitch}
                onChange={handleChange}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numSolarPanels">Number of Solar Panels</Label>
              <Input
                id="numSolarPanels"
                name="numSolarPanels"
                type="number"
                placeholder="20"
                min="1"
                value={formData.numSolarPanels}
                onChange={handleChange}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="panelLength">Panel Width (inches)</Label>
              <Input
                id="panelLength"
                name="panelLength"
                type="number"
                step="0.1"
                placeholder="65.7"
                min="1"
                value={formData.panelLength}
                onChange={handleChange}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="panelHeight">Panel Height (inches)</Label>
              <Input
                id="panelHeight"
                name="panelHeight"
                type="number"
                step="0.1"
                placeholder="39.4"
                min="1"
                value={formData.panelHeight}
                onChange={handleChange}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="panelWeight">Panel Weight (lbs)</Label>
              <Input
                id="panelWeight"
                name="panelWeight"
                type="number"
                step="0.1"
                placeholder="40.5"
                min="1"
                value={formData.panelWeight}
                onChange={handleChange}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="powerRating">Power Rating (kW)</Label>
              <Input
                id="powerRating"
                name="powerRating"
                type="number"
                step="0.01"
                placeholder="0.35"
                min="0.1"
                value={formData.powerRating}
                onChange={handleChange}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numStories">Number of Stories</Label>
              <Input
                id="numStories"
                name="numStories"
                type="number"
                placeholder="2"
                min="1"
                value={formData.numStories}
                onChange={handleChange}
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <select
                id="season"
                name="season"
                value={formData.season}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a season</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Checkbox
                id="inclementWeather"
                checked={formData.inclementWeather}
                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "inclementWeather")}
              />
              <Label htmlFor="inclementWeather">Inclement Weather Expected</Label>
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Checkbox
                id="isSquirrelScreen"
                checked={formData.isSquirrelScreen}
                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, "isSquirrelScreen")}
              />
              <Label htmlFor="isSquirrelScreen">Squirrel Screens Present</Label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating Prediction..." : "Generate Prediction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
