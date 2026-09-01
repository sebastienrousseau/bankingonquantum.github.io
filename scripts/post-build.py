import os, glob, re, json, html

def post_build():
    output_dir = "public"
    docs_dir = "docs"
    base_url = "https://bankingonquantum.com"

    # 1. Generate public/api/clock.json
    api_dir = os.path.join(output_dir, "api")
    os.makedirs(api_dir, exist_ok=True)
    clock_data = {
        "title": "Banking On Quantum Deadline Tracker",
        "last_verified": "2026-09-01",
        "deadlines": [
            {"date": "2026-09-21", "jurisdiction": "NIST CMVP", "title": "FIPS 140-2 modules to Historical List", "binding": True, "source": "https://csrc.nist.gov"},
            {"date": "2026-12-31", "jurisdiction": "European Union", "title": "Member-state PQC migration strategies & pilots", "binding": False, "source": "https://digital-strategy.ec.europa.eu"},
            {"date": "2028-12-31", "jurisdiction": "United Kingdom", "title": "NCSC Cryptographic Discovery Milestone", "binding": True, "source": "https://www.ncsc.gov.uk"},
            {"date": "2029-12-31", "jurisdiction": "Google", "title": "100% internal PQC encryption target", "binding": False, "source": "https://security.googleblog.com"},
            {"date": "2030-12-31", "jurisdiction": "United States", "title": "Federal Key Establishment Migration (EO 14409)", "binding": True, "source": "https://www.whitehouse.gov"},
            {"date": "2030-12-31", "jurisdiction": "European Union", "title": "High-risk critical financial infrastructure PQC transition", "binding": True, "source": "https://digital-strategy.ec.europa.eu"},
            {"date": "2031-12-31", "jurisdiction": "United States", "title": "Federal Digital Signature Migration Complete", "binding": True, "source": "https://www.whitehouse.gov"},
            {"date": "2035-12-31", "jurisdiction": "G7 Cyber Expert Group", "title": "Full deprecation of legacy asymmetric algorithms (RSA/ECC)", "binding": False, "source": "https://home.treasury.gov"}
        ]
    }
    with open(os.path.join(api_dir, "clock.json"), "w", encoding="utf-8") as f:
        json.dump(clock_data, f, indent=2)

    # 2. Generate llms.txt
    llms_txt_content = f"""# Banking On Quantum
> The independent reference desk for quantum-era finance: regulatory clock, readiness index, and open-source cryptography for banks, payment infrastructures and fintechs.

## Core Documentation & Resources
- Homepage: {base_url}/index.html
- Banks & Infrastructure: {base_url}/banks/index.html
- PQC Architecture & CBOM: {base_url}/banks/secure/index.html
- Quantum Algorithms & Trading: {base_url}/banks/compute/index.html
- Regulatory Matrix: {base_url}/banks/comply/index.html
- Fintech Due Diligence: {base_url}/fintech/index.html
- Board & Risk Committees: {base_url}/boards/index.html
- Deadline Tracker (HTML): {base_url}/clock/index.html
- Deadline Tracker (JSON): {base_url}/api/clock.json
- Resilience Index Scorecard: {base_url}/scorecard/index.html
- Signed Research Papers: {base_url}/research/index.html
- Open Source Toolkit (KyberLib, hsh): {base_url}/toolkit/index.html
- Vendor Landscape Map: {base_url}/vendors/index.html
- Case Studies (HSBC, JPMorgan): {base_url}/case-studies/index.html
- Advisory Services & Price Bands: {base_url}/services/index.html
- Security Posture & Trust: {base_url}/trust/index.html
- About Sebastien Rousseau: {base_url}/about/index.html
- The Quantum-Safe Briefing: {base_url}/newsletter/index.html
"""
    with open(os.path.join(output_dir, "llms.txt"), "w", encoding="utf-8") as f:
        f.write(llms_txt_content)

    # 3. Clean and fix HTML files
    for base_path in [output_dir, docs_dir]:
        if not os.path.exists(base_path):
            continue
        for html_file in glob.glob(f"{base_path}/**/*.html", recursive=True):
            with open(html_file, "r", encoding="utf-8") as f:
                content = f.read()

            # Fix canonical URLs: Replace 127.0.0.1 with https://bankingonquantum.com
            content = content.replace("http://127.0.0.1:8000", base_url)
            content = content.replace("http://localhost:8000", base_url)

            # Strip any pre-code spans wrapped around HTML
            content = re.sub(r'<pre><code><span class="text plain">(.*?)</span></code></pre>', r'\1', content, flags=re.DOTALL)
            content = re.sub(r'<pre><code class="language-html">(.*?)</code></pre>', r'\1', content, flags=re.DOTALL)
            content = re.sub(r'<pre><code>(.*?)</code></pre>', lambda m: m.group(1) if ('<div' in m.group(1) or '<section' in m.group(1) or '<details' in m.group(1) or '<table' in m.group(1)) else m.group(0), content, flags=re.DOTALL)

            # Unescape remaining HTML entities if inside HTML tags
            if "&lt;details" in content or "&lt;section" in content or "&lt;div" in content:
                for ent, val in [("&lt;", "<"), ("&gt;", ">"), ("&quot;", '"'), ("&#39;", "'"), ("&#x27;", "'")]:
                    content = content.replace(ent, val)

            # Remove double title suffixes from H1
            content = re.sub(r' \| Banking On Quantum</h1>', '</h1>', content)

            # Ensure CNAME is kept
            with open(html_file, "w", encoding="utf-8") as f:
                f.write(content)

    # Write CNAME
    with open("docs/CNAME", "w", encoding="utf-8") as f:
        f.write("bankingonquantum.com\n")
    if os.path.exists("public"):
        with open("public/CNAME", "w", encoding="utf-8") as f:
            f.write("bankingonquantum.com\n")

    print("Post-build optimization and canonical URL fix completed for bankingonquantum.com.")

if __name__ == "__main__":
    post_build()
