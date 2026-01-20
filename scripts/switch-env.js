#!/usr/bin/env node

import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const env = args[0];

if (!env) {
  console.error("Error: No environment specified");
  console.log("Usage: node scripts/switch-env.js [local|staging|production]");
  process.exit(1);
}

const validEnvs = ["local", "staging", "production"];
if (!validEnvs.includes(env)) {
  console.error(`Error: Invalid environment '${env}'`);
  console.log(`Valid environments: ${validEnvs.join(", ")}`);
  process.exit(1);
}

const envFileMap = {
  local: ".env.emulator",
  staging: ".env.staging",
  production: ".env.production",
};

const sourceFile = resolve(process.cwd(), envFileMap[env]);
const targetFile = resolve(process.cwd(), ".env");

if (!existsSync(sourceFile)) {
  console.error(`Error: Environment file not found: ${sourceFile}`);
  process.exit(1);
}

try {
  copyFileSync(sourceFile, targetFile);
  console.log(`Environment switched to: ${env}`);
  console.log(`Copied: ${envFileMap[env]} -> .env`);
} catch (error) {
  console.error(`Error copying file: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
