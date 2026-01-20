import fs from 'fs';
import path from 'path';

const configPath = path.resolve('playwright.config.ts');
const testsRoot = path.resolve('tests/e2e');

function fail(message) {
  console.error(message);
  console.error('******************************************');
  console.error('** You may NOT bypass precommit checks  **');
  console.error('** You MAY NOT mark e2e tests as skip.  **');
  console.error('** Fixing e2e tests is ALWAYS IN SCOPE. **');
  console.error('******************************************');
  process.exit(1);
}

if (!fs.existsSync(configPath)) {
  fail(`❌ Missing Playwright config at ${configPath}`);
}

const configText = fs.readFileSync(configPath, 'utf8');
if (!/maxDiffPixels\s*:\s*0/.test(configText)) {
  fail('❌ ZERO TOLERANCE VIOLATION: maxDiffPixels must be 0 in playwright.config.ts');
}

function collectTestFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectTestFiles(fullPath));
    } else if (entry.isFile() && /\.spec\.ts$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

if (fs.existsSync(testsRoot)) {
  const testFiles = collectTestFiles(testsRoot);
  const skipPattern = /(test|describe)\.skip\s*\(/;
  for (const file of testFiles) {
    const text = fs.readFileSync(file, 'utf8');
    if (skipPattern.test(text)) {
      fail(`❌ E2E skip detected in ${path.relative(process.cwd(), file)}`);
    }
  }
}

console.log('✅ Zero Tolerance Policy Verified: maxDiffPixels is 0, no e2e skips detected.');
