/**
 * Module Name: construction_risk_predictor
 * File Name: module_name.js
 *
 * Description:
 * This module calculates construction project risk metrics
 * based on task data provided through an external JSON file.
 *
 * Requirements Covered:
 * - Function calls
 * - No hardcoded input
 * - Clear commenting
 * - Relevant variable names
 */

const fs = require("fs");

/**
 * calculateRisk
 * Calculates risk metrics based on project task information.
 *
 * @param {Object} projectData - Parsed JSON input data
 * @returns {Object} Risk metrics result
 */
function calculateRisk(projectData) {
  const taskList = projectData.tasks;

  if (!taskList || taskList.length === 0) {
    throw new Error("Input file contains no tasks.");
  }

  // Total duration of all tasks
  const totalProjectDuration = taskList.reduce(
    (sum, task) => sum + task.duration,
    0,
  );

  // Count tasks with dependencies
  const dependentTaskCount = taskList.filter(
    (task) => task.dependency !== null,
  ).length;

  // Risk calculations
  const delayProbability = Math.min(1, totalProjectDuration / 100);
  const costRisk = Math.min(1, dependentTaskCount / 10);
  const materialRiskScore = totalProjectDuration * 0.5;
  const laborRiskScore = totalProjectDuration * 0.3;

  return {
    delayProbability: Number(delayProbability.toFixed(2)),
    costRisk: Number(costRisk.toFixed(2)),
    materialRiskScore: Number(materialRiskScore.toFixed(2)),
    laborRiskScore: Number(laborRiskScore.toFixed(2)),
  };
}

/**
 * loadInputFile
 * Reads and parses JSON file from given path.
 *
 * @param {string} filePath - Path to JSON input file
 * @returns {Object} Parsed JSON data
 */
function loadInputFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent);
}

/**
 * main
 * Entry point of the module.
 * Accepts input file path via command line.
 */
function main() {
  const inputFilePath = process.argv[2];

  if (!inputFilePath) {
    console.log("Usage: node module_name.js <input_file.json>");
    process.exit(1);
  }

  try {
    const projectData = loadInputFile(inputFilePath);
    const riskResult = calculateRisk(projectData);

    console.log("\n===== Risk Analysis Result =====");
    Object.entries(riskResult).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Execute only when run directly
if (require.main === module) {
  main();
}

module.exports = { calculateRisk };
