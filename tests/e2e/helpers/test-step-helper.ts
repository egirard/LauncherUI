import fs from "node:fs";
import path from "node:path";
import { type Page, type TestInfo, expect } from "@playwright/test";

export interface Verification {
  spec: string;
  check: () => Promise<void>;
}

export interface StepOptions {
  description: string;
  verifications: Verification[];
}

interface DocStep {
  title: string;
  image: string;
  specs: string[];
}

export class TestStepHelper {
  private stepCount = 0;
  private steps: DocStep[] = [];
  private metadataTitle = "";
  private metadataDescription = "";

  constructor(
    private page: Page,
    private testInfo: TestInfo,
  ) {}

  setMetadata(title: string, description: string) {
    this.metadataTitle = title;
    this.metadataDescription = description;
  }

  async step(id: string, options: StepOptions) {
    for (const verification of options.verifications) {
      await verification.check();
    }

    const paddedIndex = String(this.stepCount++).padStart(3, "0");
    const slug = id.replace(/_/g, "-");
    const filenameBase = `${paddedIndex}-${slug}`;

    await expect(this.page).toHaveScreenshot(filenameBase);

    this.steps.push({
      title: options.description,
      image: `./screenshots/${this.testInfo.project.name}/${filenameBase}.png`,
      specs: options.verifications.map((verification) => verification.spec),
    });
  }

  generateDocs() {
    const projectName = this.testInfo.project.name;
    const docPath = path.join(
      path.dirname(this.testInfo.file),
      `README.${projectName}.md`,
    );
    let content = `# Test: ${this.metadataTitle || this.testInfo.title}\n\n`;
    if (this.metadataDescription) {
      content += `${this.metadataDescription}\n\n`;
    }

    for (const step of this.steps) {
      content += `## ${step.title}\n\n`;
      content += `![${step.title}](${step.image})\n\n`;
      content += `**Verifications:**\n`;
      for (const spec of step.specs) {
        content += `- [x] ${spec}\n`;
      }
      content += "\n---\n\n";
    }

    fs.writeFileSync(docPath, content);
  }
}
