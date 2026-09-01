---
name: "Banking On Quantum"
short_name: "bankingonquantum"
title: "Open Source Engineering Toolkit: KyberLib, hsh & Cryptographic Utilities"
description: "Production-grade, zero-allocation Rust libraries for post-quantum key encapsulation, secure password hashing, and financial messaging."
keywords: "KyberLib, Rust PQC, ML-KEM Rust, hsh digest, open source financial cryptography"
author: "Sebastien Rousseau"
date: "2026-09-01"
language: "en-GB"
layout: "page"
permalink: "https://bankingonquantum.com/toolkit/index.html"
logo: "https://cloudcdn.pro/bankingonquantum/v1/logos/bankingonquantum.svg"
banner: "https://cloudcdn.pro/stocks/images/quantum-computer-room-1200.webp"
banner_alt: "Banking On Quantum — Dilution Refrigerator and Quantum Computing Infrastructure"
---

# Open Source Engineering Toolkit

*45.7M+ Total Downloads · Apache-2.0 / MIT Dual License · Verified CycloneDX SBOMs*

Production-tested, high-assurance cryptographic building blocks written in Rust. Designed for embedded systems, high-throughput financial gateways, and sovereign on-premises environments with zero external network dependencies.

<div class="bento-grid my-4">
<div class="bento-card bento-col-6">
<div class="d-flex justify-content-between align-items-center mb-2">
<div class="bento-tag">Rust · FIPS 203 ML-KEM</div>
<span class="sigstore-badge">Dual Apache/MIT</span>
</div>
<h2 class="bento-title">KyberLib</h2>
<p class="bento-desc">High-assurance, zero-allocation Rust implementation tracking the finalized NIST FIPS 203 (ML-KEM-512, ML-KEM-768, ML-KEM-1024) standard. Includes comprehensive NIST KAT test vectors and constant-time execution primitives.</p>
<div class="d-flex gap-3 flex-wrap">
<a href="https://github.com/sebastienrousseau/kyberlib" target="_blank" rel="noopener noreferrer" class="btn-primary-quantum">GitHub Repository ↗</a>
<a href="https://crates.io/crates/kyberlib" target="_blank" rel="noopener noreferrer" class="btn-secondary-quantum">Crates.io ↗</a>
</div>
</div>

<div class="bento-card bento-col-6">
<div class="d-flex justify-content-between align-items-center mb-2">
<div class="bento-tag">Rust · Password & Digest Suite</div>
<span class="sigstore-badge">Dual Apache/MIT</span>
</div>
<h2 class="bento-title">hsh</h2>
<p class="bento-desc">High-performance cryptographic password-hashing and digest utilities in Rust implementing Argon2, bcrypt, scrypt, and secure key derivation functions.</p>
<div class="d-flex gap-3 flex-wrap">
<a href="https://github.com/sebastienrousseau/hsh" target="_blank" rel="noopener noreferrer" class="btn-primary-quantum">GitHub Repository ↗</a>
<a href="https://crates.io/crates/hsh" target="_blank" rel="noopener noreferrer" class="btn-secondary-quantum">Crates.io ↗</a>
</div>
</div>

<div class="bento-card bento-col-6">
<div class="d-flex justify-content-between align-items-center mb-2">
<div class="bento-tag">Rust · Payment Rails</div>
<span class="sigstore-badge">Dual Apache/MIT</span>
</div>
<h3 class="bento-title">ISO 20022 Parser Suite (pain001 / pacs008)</h3>
<p class="bento-desc">High-speed, memory-safe ISO 20022 XML financial payment message parser and validator supporting custom digital signature envelope extensions.</p>
<div class="d-flex gap-3 flex-wrap">
<a href="https://github.com/sebastienrousseau/pain001" target="_blank" rel="noopener noreferrer" class="author-link">View pain001 ↗</a>
<a href="https://github.com/sebastienrousseau/pacs008" target="_blank" rel="noopener noreferrer" class="author-link">View pacs008 ↗</a>
</div>
</div>

<div class="bento-card bento-col-6">
<div class="d-flex justify-content-between align-items-center mb-2">
<div class="bento-tag">Rust · Secret Management</div>
<span class="sigstore-badge">Dual Apache/MIT</span>
</div>
<h3 class="bento-title">Euxis</h3>
<p class="bento-desc">Lightweight, hardened cryptographic secret and certificate management daemon designed for sovereign enclave deployments and hardware security module orchestration.</p>
<div class="d-flex gap-3 flex-wrap">
<a href="https://github.com/sebastienrousseau/euxis" target="_blank" rel="noopener noreferrer" class="author-link">GitHub Repository ↗</a>
</div>
</div>
</div>
