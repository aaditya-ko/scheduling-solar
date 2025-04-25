import { NextResponse } from "next/server"
import { writeFile, readFile } from "fs/promises"
import { exec } from "child_process"
import { promisify } from "util"
import path from "path"

const execAsync = promisify(exec)

export async function POST(request: Request) {
  try {
    // Parse the request body
    const formData = await request.json()

    // Log the received data
    console.log("Received prediction request:", formData)

    // Convert form field names to match what the model expects
    const modelPayload = {
      roofPitch: Number.parseFloat(formData.roofPitch),
      numSolarPanels: Number.parseInt(formData.numSolarPanels),
      panelHeight: Number.parseFloat(formData.panelHeight),
      panelWidth: Number.parseFloat(formData.panelLength), // Note: form uses panelLength, model expects panelWidth
      panelWeight: Number.parseFloat(formData.panelWeight),
      powerRating: Number.parseFloat(formData.powerRating),
      isSquirrelScreen: formData.isSquirrelScreen ? 1 : 0, // Convert boolean to int
      numStories: Number.parseInt(formData.numStories),
      season: formData.season.charAt(0).toUpperCase() + formData.season.slice(1), // Capitalize first letter
      numEmployees: Number.parseInt(formData.numEmployees),
      driveTime: Number.parseFloat(formData.driveTime),
    }

    // Define paths
    const modelDir = path.join(process.cwd(), "ml-model")
    const payloadPath = path.join(modelDir, "payload.json")
    const resultPath = path.join(modelDir, "result.json")

    // Save the payload as JSON
    await writeFile(payloadPath, JSON.stringify(modelPayload, null, 2))

    // Run the Python script
    // Note: Adjust the path to your Python executable as needed
    const pythonPath = "python" // or "python3" depending on your system
    const modelScript = path.join(modelDir, "model.py")

    console.log(`Executing: ${pythonPath} ${modelScript}`)
    const { stdout, stderr } = await execAsync(`${pythonPath} ${modelScript}`, {
      cwd: modelDir,
    })

    if (stderr && !stderr.includes("Prediction written to")) {
      console.error("Python error:", stderr)
      return NextResponse.json({ error: "Error running prediction model", details: stderr }, { status: 500 })
    }

    console.log("Python output:", stdout)

    // Read the result JSON
    const resultJson = await readFile(resultPath, "utf-8")
    const result = JSON.parse(resultJson)

    // Return the prediction result
    return NextResponse.json({
      predictedTime: result.prediction,
      message: "Prediction generated successfully",
    })
  } catch (error) {
    console.error("Error in prediction API:", error)
    return NextResponse.json({ error: "Failed to generate prediction", details: String(error) }, { status: 500 })
  }
}
