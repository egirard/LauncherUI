<svelte:head>
  <title>Launcher UI E2E</title>
</svelte:head>

<section class="surface" data-testid="e2e-surface">
  <header class="headline">
    <p class="eyebrow">Zero-pixel tolerance surface</p>
    <h1>Launcher UI E2E Surface</h1>
    <p class="subtitle">Deterministic layout for Playwright snapshots.</p>
  </header>

  <div class="status">
    <span class="dot" aria-hidden="true"></span>
    <span class="label">Snapshot status</span>
    <strong class="value" data-testid="e2e-status">Ready</strong>
  </div>

  <ul class="metrics" aria-label="E2E baseline metrics">
    <li>
      <span class="metric-label">Viewport</span>
      <span class="metric-value">1280×720</span>
    </li>
    <li>
      <span class="metric-label">Renderer</span>
      <span class="metric-value">Software</span>
    </li>
    <li>
      <span class="metric-label">Motion</span>
      <span class="metric-value">Reduced</span>
    </li>
  </ul>
</section>

<style>
  :global(body) {
    margin: 0;
    font-family: "Courier New", Courier, monospace;
    background: #111318;
    color: #f5f5f5;
  }

  .surface {
    display: grid;
    gap: 24px;
    padding: 48px;
    max-width: 900px;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 12px;
    margin: 0 0 12px;
    color: #93c5fd;
  }

  h1 {
    margin: 0 0 8px;
    font-size: 32px;
  }

  .subtitle {
    margin: 0;
    color: #cbd5f5;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 999px;
    background: #1f2937;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #22c55e;
  }

  .label {
    font-size: 12px;
    color: #9ca3af;
  }

  .value {
    font-size: 14px;
  }

  .metrics {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    padding: 0;
    margin: 0;
  }

  .metrics li {
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 16px;
    background: #0f172a;
  }

  .metric-label {
    display: block;
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 6px;
  }

  .metric-value {
    font-size: 16px;
  }
</style>
