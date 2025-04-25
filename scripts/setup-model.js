// This script helps set up the ML model directory
// Run with: node scripts/setup-model.js

const fs = require("fs")
const path = require("path")

const modelDir = path.join(process.cwd(), "ml-model")

// Create the ml-model directory if it doesn't exist
if (!fs.existsSync(modelDir)) {
  console.log("Creating ml-model directory...")
  fs.mkdirSync(modelDir, { recursive: true })
}

console.log("Model directory set up at:", modelDir)
console.log("Please copy your model.py and quantile_xgb_v1.json files to this directory.")
