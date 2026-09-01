---
name: "Banking On Quantum"
short_name: "bankingonquantum"
title: "Post-Quantum Banking Resilience Index (PQ-BRI): Interactive Scorecard"
description: "Interactive self-assessment evaluating financial institution quantum readiness across 6 core governance and cryptographic dimensions."
keywords: "quantum banking resilience index, PQC scorecard, bank crypto assessment, quantum readiness calculator"
author: "Sebastien Rousseau"
date: "2026-09-01"
language: "en-GB"
layout: "page"
permalink: "https://bankingonquantum.com/scorecard/index.html"
logo: "https://cloudcdn.pro/bankingonquantum/v1/logos/bankingonquantum.svg"
banner: "https://cloudcdn.pro/stocks/images/quantum-computer-room-1200.webp"
banner_alt: "Banking On Quantum — Dilution Refrigerator and Quantum Computing Infrastructure"
---

# Post-Quantum Banking Resilience Index (PQ-BRI)

The **PQ-BRI** is an independent, 6-dimension evaluation framework designed for Chief Information Security Officers, Treasury CTOs, and Risk Committees to quantify institutional exposure to quantum cryptanalytic threats.

## Interactive Self-Assessment Tool

Adjust the sliders below to reflect your institution's current operational posture across each dimension:

<div class="scorecard-tool-container">
<div class="score-dimension-row">
<div>
<h4 class="h6 fw-bold mb-1">1. Board Governance & Fiduciary Oversight</h4>
<p class="small text-muted mb-0">Board-approved quantum risk policy, designated executive owner, and quarterly reporting.</p>
</div>
<div>
<input type="range" class="score-slider" id="scoreGov" min="0" max="5" step="0.5" value="2.0">
</div>
<div class="score-display-val" id="scoreGovVal">2.0 / 5.0</div>
</div>

<div class="score-dimension-row">
<div>
<h4 class="h6 fw-bold mb-1">2. Cryptographic Inventory & CBOM</h4>
<p class="small text-muted mb-0">Automated, machine-readable inventory of all algorithms, keys, certificates, and libraries.</p>
</div>
<div>
<input type="range" class="score-slider" id="scoreCbom" min="0" max="5" step="0.5" value="1.5">
</div>
<div class="score-display-val" id="scoreCbomVal">1.5 / 5.0</div>
</div>

<div class="score-dimension-row">
<div>
<h4 class="h6 fw-bold mb-1">3. Crypto-Agility Architecture</h4>
<p class="small text-muted mb-0">Ability to swap encryption algorithms and keys without code rewrites or database migrations.</p>
</div>
<div>
<input type="range" class="score-slider" id="scoreAgility" min="0" max="5" step="0.5" value="2.5">
</div>
<div class="score-display-val" id="scoreAgilityVal">2.5 / 5.0</div>
</div>

<div class="score-dimension-row">
<div>
<h4 class="h6 fw-bold mb-1">4. Payment Rail & SWIFT Readiness</h4>
<p class="small text-muted mb-0">Integration of hybrid PQC tunnels and enlarged signature support in ISO 20022 message envelopes.</p>
</div>
<div>
<input type="range" class="score-slider" id="scoreRails" min="0" max="5" step="0.5" value="2.0">
</div>
<div class="score-display-val" id="scoreRailsVal">2.0 / 5.0</div>
</div>

<div class="score-dimension-row">
<div>
<h4 class="h6 fw-bold mb-1">5. Third-Party & Fintech Supply Chain</h4>
<p class="small text-muted mb-0">Contractual PQC requirements and CBOM verification for external software vendors and cloud services.</p>
</div>
<div>
<input type="range" class="score-slider" id="scoreVendors" min="0" max="5" step="0.5" value="1.5">
</div>
<div class="score-display-val" id="scoreVendorsVal">1.5 / 5.0</div>
</div>

<div class="score-dimension-row">
<div>
<h4 class="h6 fw-bold mb-1">6. Algorithm Testing & HSM Compliance</h4>
<p class="small text-muted mb-0">FIPS 140-3 HSM validation and active testbed benchmarking for FIPS 203 ML-KEM and FIPS 204 ML-DSA.</p>
</div>
<div>
<input type="range" class="score-slider" id="scoreHsm" min="0" max="5" step="0.5" value="2.0">
</div>
<div class="score-display-val" id="scoreHsmVal">2.0 / 5.0</div>
</div>

<div class="scorecard-total-box">
<div>
<div class="text-muted small text-uppercase fw-bold">Overall Resilience Score</div>
<div class="scorecard-grade" id="scoreTotal">1.92 / 5.00</div>
<div class="text-warning fw-bold mt-1" id="scoreGrade">Tier 3 (Discovery Phase)</div>
</div>
<div class="max-w-md">
<div class="text-muted small mb-1">Strategic Recommendation:</div>
<div class="small fw-semibold text-headline" id="scoreRecommendation">Prioritise SWIFT / ISO 20022 payment rails for asymmetric algorithm discovery.</div>
</div>
</div>
</div>

<div class="card-surface p-4 text-center my-4">
<h3 class="h4 fw-bold text-headline mb-2">Request the Formal Assessment Report (PDF)</h3>
<p class="text-muted mb-3">Receive a detailed board-level PDF assessment with full dimension breakdowns and regulator gap analysis.</p>
<a href="/contact/index.html" class="btn-primary-quantum">Request Assessment Report (PDF) →</a>
</div>
