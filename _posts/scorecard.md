---
name: "Banking On Quantum"
short_name: "bankingonquantum"
title: "Post-Quantum Banking Resilience Index (PQ-BRI): Interactive Scorecard"
description: "Interactive self-assessment evaluating financial institution quantum readiness across 6 core governance and cryptographic dimensions."
keywords: "quantum banking resilience index, PQC scorecard, bank crypto assessment, quantum readiness calculator, HKMA benchmark"
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

<div class="card-surface p-3 my-3">
<strong>Global Supervisory Benchmark:</strong> In July 2026, the Hong Kong Monetary Authority (HKMA) published its initial sector-wide Quantum Preparedness Index baseline, scoring the banking sector at <strong>2.3 / 10</strong> with a target of full resilience by 2030. The PQ-BRI evaluates institution-specific readiness on a 5.0 scale.
</div>

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
<p class="small text-muted mb-0">FIPS 140-3 transition progress and active hybrid ML-KEM / ML-DSA prototype testing.</p>
</div>
<div>
<input type="range" class="score-slider" id="scoreTesting" min="0" max="5" step="0.5" value="2.0">
</div>
<div class="score-display-val" id="scoreTestingVal">2.0 / 5.0</div>
</div>
</div>

<div class="score-result-card my-4">
<div class="score-result-title">Your Institution's Aggregate Readiness Score</div>
<div class="score-result-value" id="scoreTotal">1.92 / 5.00</div>
<div class="score-result-grade" id="scoreGrade">Tier 3 (Discovery & Inventory Phase)</div>
<p class="score-result-rec" id="scoreRecommendation">Prioritise SWIFT / ISO 20022 payment rails for asymmetric algorithm discovery.</p>
<div class="mt-4">
<a href="/contact/index.html" class="btn-primary-quantum">Request Formal Assessment Pack →</a>
</div>
</div>
