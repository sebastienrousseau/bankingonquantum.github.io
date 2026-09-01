---
name: "Banking On Quantum"
short_name: "bankingonquantum"
title: "PQC Migration: Inventory, CBOM, Hybrid TLS & HSM Architecture"
description: "Deep technical guide on executing a post-quantum cryptographic migration across banking networks."
keywords: "CBOM banking, post-quantum cryptography architecture, hybrid TLS 1.3, FIPS 203, FIPS 204"
author: "Sebastien Rousseau"
date: "2026-09-01"
language: "en-GB"
layout: "page"
permalink: "https://bankingonquantum.com/banks/secure/index.html"
logo: "https://cloudcdn.pro/bankingonquantum/v1/logos/bankingonquantum.svg"
banner: "https://cloudcdn.pro/stocks/images/quantum-computer-room-1200.webp"
banner_alt: "Banking On Quantum — Quantum Computing Infrastructure and Dilution Refrigerator"
---

# PQC Migration: Technical Architecture & CBOM

Every cryptographic migration fails if it starts with algorithm replacement instead of asset discovery. In large banking architectures, cryptographic primitives are embedded across legacy COBOL runtimes, Java microservices, API gateways, database encryption layers, and third-party vendor appliances.

## The Six-Stage Migration Lifecycle

1. **Automated Discovery & CBOM Synthesis:** Generate a CycloneDX 1.6 Cryptographic Bill of Materials covering all active keys, certificates, algorithms, and cryptographic dependencies.
2. **Exposure & Risk Prioritisation:** Score every cryptographic asset against data confidentiality longevity requirements (e.g. 10-year mortgages vs. sub-second quotes).
3. **Hybrid TLS 1.3 Gateway Deployment:** Establish dual-mode TLS tunnels combining classical ECDHE (X25519) with post-quantum ML-KEM-768 (FIPS 203).
4. **Hardware Security Module (HSM) Firmware Modernisation:** Transition key generation and storage pipelines to FIPS 140-3 validated HSMs capable of handling lattice-based keys.
5. **Payment Rail Envelope Re-engineering:** Update ISO 20022 message parsers and digital signature verifiers to process ML-DSA-65 (FIPS 204) signatures.
6. **Continuous Cryptographic Regression Testing:** Automate CI/CD verification to prevent accidental introduction of deprecated asymmetric algorithms.

<div class="card-surface p-4 my-4">
  <h3 class="h5 fw-bold text-headline mb-2">Standardized NIST PQC Algorithms</h3>
  <div class="table-responsive">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>Standard</th>
          <th>Algorithm</th>
          <th>Function</th>
          <th>Key Size</th>
          <th>Banking Use Case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>FIPS 203</strong></td>
          <td>ML-KEM (Kyber)</td>
          <td>Key Encapsulation</td>
          <td>800–1,568 B</td>
          <td>Session keys, TLS 1.3 tunnels, API encryption</td>
        </tr>
        <tr>
          <td><strong>FIPS 204</strong></td>
          <td>ML-DSA (Dilithium)</td>
          <td>Digital Signatures</td>
          <td>1,312–2,592 B</td>
          <td>SWIFT transaction signing, wire authorisations</td>
        </tr>
        <tr>
          <td><strong>FIPS 205</strong></td>
          <td>SLH-DSA (SPHINCS+)</td>
          <td>Stateless Signatures</td>
          <td>32–64 B keys / 7–49 KB sigs</td>
          <td>Root CAs, firmware signing, long-term archiving</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
