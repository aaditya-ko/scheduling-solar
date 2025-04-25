// This script checks if Python and required packages are installed
// Run with: node scripts/check-python-env.js

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Define the Python command to use
const pythonCommand = process.platform === "win32" ? "python" : "python3"

// Check if Python is installed
try {
  const pythonVersion = execSync(`${pythonCommand} --version`).toString().trim()
  console.log(`✅ ${pythonVersion} is installed`)
} catch (error) {
  console.error("❌ Python is not installed or not in PATH")
  console.error("Please install Python 3.6+ from https://www.python.org/downloads/")
  process.exit(1)
}

// Check if required packages are installed
const requiredPackages = ["xgboost", "pandas", "numpy"]

for (const pkg of requiredPackages) {
  try {
    execSync(`${pythonCommand} -c "import ${pkg}"`)
    console.log(`✅ ${pkg} is installed`)
  } catch (error) {
    console.error(`❌ ${pkg} is not installed`)
    console.error(`Please install it with: pip install ${pkg}`)
    process.exit(1)
  }
}

// Check if model directory exists
const modelDir = path.join(process.cwd(), "ml-model")
if (!fs.existsSync(modelDir)) {
  console.log(`Creating ml-model directory at ${modelDir}`)
  fs.mkdirSync(modelDir, { recursive: true })
} else {
  console.log(`✅ ml-model directory exists at ${modelDir}`)
}

// Check if model.py exists
const modelPath = path.join(modelDir, "model.py")
if (!fs.existsSync(modelPath)) {
  console.error(`❌ model.py not found at ${modelPath}`)
  console.error("Please copy your model.py file to this location")
} else {
  console.log(`✅ model.py found at ${modelPath}`)
}

// Check if model file exists
const xgbModelPath = path.join(modelDir, "quantile_xgb_v1.json")
if (!fs.existsSync(xgbModelPath)) {
  console.error(`❌ quantile_xgb_v1.json not found at ${xgbModelPath}`)
  console.error("Please copy your model file to this location")
} else {
  console.log(`✅ quantile_xgb_v1.json found at ${xgbModelPath}`)
}

console.log("\nEnvironment check complete!")
