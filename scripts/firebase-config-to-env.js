#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";

const validEnvs = ["staging", "production"];

const parseArgs = () => {
  const args = process.argv.slice(2);
  const options = {
    env: "production",
    input: null,
    output: null,
    help: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--env" || arg === "-e") {
      options.env = args[i + 1];
      i += 1;
    } else if (arg === "--input" || arg === "-i") {
      options.input = args[i + 1];
      i += 1;
    } else if (arg === "--output" || arg === "-o") {
      options.output = args[i + 1];
      i += 1;
    }
  }

  return options;
};

const showHelp = () => {
  console.log(`
Firebase Config to .env Converter

Usage:
  node scripts/firebase-config-to-env.js [options]

Options:
  --env, -e <env>       Environment: staging or production (default: production)
  --input, -i <file>    Read Firebase config from a JSON file
  --output, -o <file>   Write output to a file instead of stdout
  --help, -h            Show this help message

Input format:
  {
    "apiKey": "AIza...",
    "authDomain": "your-project.firebaseapp.com",
    "projectId": "your-project",
    "storageBucket": "your-project.appspot.com",
    "messagingSenderId": "123456789",
    "appId": "1:123456789:web:abc...",
    "measurementId": "G-ABC..."
  }
`);
};

const extractConfig = (input) => {
  const cleaned = input
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/const\s+\w+\s*=\s*/, "")
    .replace(/var\s+\w+\s*=\s*/, "")
    .replace(/let\s+\w+\s*=\s*/, "")
    .replace(/;[\s\n]*$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const jsonStr = cleaned
      .replace(/'/g, '"')
      .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
    return JSON.parse(jsonStr);
  }
};

const validateConfig = (config) => {
  const requiredFields = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ];

  const missingFields = requiredFields.filter((field) => !config[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }
};

const convertToEnv = (config, env) => {
  const lines = [];
  const prefix = env === "staging" ? "VITE_FIREBASE_STAGING_" : "VITE_FIREBASE_";

  lines.push(env === "staging" ? "# Staging Environment" : "# Production Environment");
  lines.push(`VITE_FIREBASE_ENV=${env}`);
  lines.push("");
  lines.push(env === "staging" ? "# Firebase Configuration for Staging" : "# Firebase Configuration");

  const keyMapping = {
    apiKey: `${prefix}API_KEY`,
    authDomain: `${prefix}AUTH_DOMAIN`,
    projectId: `${prefix}PROJECT_ID`,
    storageBucket: `${prefix}STORAGE_BUCKET`,
    messagingSenderId: `${prefix}MESSAGING_SENDER_ID`,
    appId: `${prefix}APP_ID`,
    measurementId: `${prefix}MEASUREMENT_ID`,
  };

  for (const [key, envVar] of Object.entries(keyMapping)) {
    if (config[key]) {
      lines.push(`${envVar}=${config[key]}`);
    }
  }

  return `${lines.join("\n")}\n`;
};

const readStdin = async () =>
  new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("Paste your Firebase config and press Ctrl+D when done:\n");
    let input = "";
    rl.on("line", (line) => {
      input += `${line}\n`;
    });

    rl.on("close", () => {
      resolve(input);
    });
  });

const main = async () => {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  if (!validEnvs.includes(options.env)) {
    console.error(
      `Error: Invalid environment '${options.env}'. Valid options: ${validEnvs.join(", ")}`,
    );
    process.exit(1);
  }

  try {
    const inputStr = options.input
      ? readFileSync(options.input, "utf8")
      : await readStdin();

    if (!inputStr.trim()) {
      throw new Error("No input provided.");
    }

    const config = extractConfig(inputStr);
    validateConfig(config);

    const envContent = convertToEnv(config, options.env);

    if (options.output) {
      writeFileSync(options.output, envContent);
      console.log(`Wrote .env configuration to: ${options.output}`);
    } else {
      console.log(envContent);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}

export { convertToEnv, extractConfig, validateConfig };
