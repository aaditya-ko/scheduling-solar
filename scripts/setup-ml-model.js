// This script helps set up the ML model directory
// Run with: node scripts/setup-ml-model.js

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Define the Python command to use
const pythonCommand = process.platform === "win32" ? "python" : "python3"

// Create the ml-model directory if it doesn't exist
const modelDir = path.join(process.cwd(), "ml-model")
if (!fs.existsSync(modelDir)) {
  console.log("Creating ml-model directory...")
  fs.mkdirSync(modelDir, { recursive: true })
}

// Create model.py file
const modelPyPath = path.join(modelDir, "model.py")
if (!fs.existsSync(modelPyPath)) {
  console.log("Creating model.py file...")
  const modelPyContent = `#!/usr/bin/env python3
"""
run_inference.py - load payload.json, preprocess, run XGBoost booster, save result.json
"""

import json, sys
from pathlib import Path

import numpy as np
import xgboost as xgb
import pandas as pd

# ---------- CONFIG ----------
MODEL_PATH  = Path("quantile_xgb_v1.json")
INPUT_PATH  = Path("payload.json")
OUTPUT_PATH = Path("result.json")

# Final feature order expected by the model
FEATURE_ORDER = [
    "tilt",
    "panel_count",
    "module_physicals",
    "rating",
    "squirrel",
    "more_than_one_story",
    "season_Fall",
    "season_Spring",
    "season_Summer",
    "season_Winter",
]
# ----------------------------

SEASONS = {"Fall", "Spring", "Summer", "Winter"}  # allowed values


def preprocess(raw: dict) -> dict:
    """
    Map raw payload fields to the engineered features used by the model.
    Raises ValueError if required keys are absent or invalid.
    """
    try:
        # Mandatory raw fields
        tilt           = float(raw["roofPitch"])
        panel_count    = int(raw["numSolarPanels"])
        height         = float(raw["panelHeight"])
        width          = float(raw["panelWidth"])
        weight         = float(raw["panelWeight"])
        rating         = float(raw["powerRating"])
        squirrel       = int(raw["isSquirrelScreen"])
        stories_bool   = int(raw["numStories"] > 1)        # 0 if one story, 1 if >1
        season_raw     = raw["season"]
    except KeyError as e:
        raise ValueError(f"Missing key in payload: {e}")

    if season_raw not in SEASONS:
        raise ValueError(f"season must be one of {SEASONS}, got '{season_raw}'")

    # Feature engineering
    module_physicals = height * width * (weight ** 2)

    # One‑hot encode season
    season_oh = {f"season_{s}": (1 if s == season_raw else 0) for s in SEASONS}

    return {
        "tilt": tilt,
        "panel_count": panel_count,
        "module_physicals": module_physicals,
        "rating": rating,
        "squirrel": squirrel,
        "more_than_one_story": stories_bool,
        **season_oh,
    }


def main():
    # --- load booster ---
    booster = xgb.Booster()
    booster.load_model(str(MODEL_PATH))

    # --- read input JSON ---
    try:
        with INPUT_PATH.open() as f:
            raw_payload = json.load(f)
    except FileNotFoundError:
        sys.exit(f"Input file {INPUT_PATH} not found.")
    except json.JSONDecodeError as e:
        sys.exit(f"Bad JSON in {INPUT_PATH}: {e}")

    # --- preprocess ---
    try:
        features_dict = preprocess(raw_payload)
    except ValueError as e:
        sys.exit(str(e))

    # Ensure final feature alignment
    missing = [k for k in FEATURE_ORDER if k not in features_dict]
    if missing:
        sys.exit(f"Missing engineered features: {missing}")

    X_df = pd.DataFrame([features_dict], columns=FEATURE_ORDER)
    dmatrix = xgb.DMatrix(X_df)

    # --- predict ---
    pred = float(booster.predict(dmatrix)[0])

    # Business‑logic post‑processing
    num_employees = int(raw_payload["numEmployees"])
    drive_time    = float(raw_payload["driveTime"])      # minutes per day

    pred_per_emp  = pred / num_employees
    work_days     = max(int(pred_per_emp / 9), 0)   # 9‑h workday
    final_pred    = pred_per_emp*60 + work_days*drive_time

    # --- write output ---
    with OUTPUT_PATH.open("w") as f:
        json.dump({"prediction": final_pred}, f)

    print(f"Prediction written to {OUTPUT_PATH}: {final_pred:.4f}")


if __name__ == "__main__":
    main()
`
  fs.writeFileSync(modelPyPath, modelPyContent)
}

// Create a dummy model file if it doesn't exist
// In a real scenario, you would copy your actual model file
const modelFilePath = path.join(modelDir, "quantile_xgb_v1.json")
if (!fs.existsSync(modelFilePath)) {
  console.log("Creating a dummy model file...")
  console.log("NOTE: This is a placeholder. You need to replace this with your actual model file.")
  fs.writeFileSync(modelFilePath, "{}")
}

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
const missingPackages = []

for (const pkg of requiredPackages) {
  try {
    execSync(`${pythonCommand} -c "import ${pkg}"`)
    console.log(`✅ ${pkg} is installed`)
  } catch (error) {
    console.error(`❌ ${pkg} is not installed`)
    missingPackages.push(pkg)
  }
}

if (missingPackages.length > 0) {
  console.log("\nInstalling missing packages...")
  try {
    execSync(`${pythonCommand} -m pip install ${missingPackages.join(" ")}`)
    console.log("✅ All packages installed successfully")
  } catch (error) {
    console.error("❌ Failed to install packages")
    console.error(`Please install them manually with: pip install ${missingPackages.join(" ")}`)
  }
}

console.log("\nSetup complete! Your ml-model directory is ready.")
console.log(`Model directory: ${modelDir}`)
console.log("NOTE: If you have your own model file, replace the dummy file with your actual model.")
