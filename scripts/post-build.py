import os, re, json, shutil

repo_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# 1. Sync manifest.json
manifest_data = {
    "name": "Banking On Quantum",
    "short_name": "bankingonquantum",
    "description": "Prepare financial institutions for the post-quantum era with Post-Quantum Cryptography (PQC), Quantum Key Distribution (QKD), and quantum algorithms.",
    "start_url": "/index.html",
    "scope": "/",
    "display": "standalone",
    "orientation": "portrait-primary",
    "background_color": "#ffffff",
    "theme_color": "#020617",
    "lang": "en-GB",
    "icons": [
        {
            "src": "https://cloudcdn.pro/bankingonquantum/v1/logos/bankingonquantum.svg",
            "sizes": "512x512",
            "type": "image/svg+xml",
            "purpose": "any maskable"
        },
        {
            "src": "/favicon.ico",
            "sizes": "16x16 32x32 48x48",
            "type": "image/x-icon",
            "purpose": "any maskable"
        }
    ]
}

for target in ["public", "docs"]:
    m_path = os.path.join(repo_dir, target, "manifest.json")
    with open(m_path, "w", encoding="utf-8") as f:
        json.dump(manifest_data, f, indent=2)

# 2. Clean up internal links, CSP, and unescape interactive components in all HTML output
csp_meta = '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' https://cdn.jsdelivr.net; connect-src \'self\' https://formspree.io https://cdn.jsdelivr.net; img-src \'self\' data: https: https://cloudcdn.pro; style-src \'self\' \'unsafe-inline\' https://cdn.jsdelivr.net; font-src \'self\' data:; form-action \'self\' https://formspree.io; base-uri \'none\'; object-src \'none\';" />'

for target in ["public", "docs"]:
    base_target = os.path.join(repo_dir, target)
    if not os.path.exists(base_target):
        continue
    for root, _, files in os.walk(base_target):
        for file in files:
            if not file.endswith(".html"):
                continue
            fpath = os.path.join(root, file)
            with open(fpath, "r", encoding="utf-8") as f:
                html = f.read()

            # Clean links
            html = html.replace('href="/about.html"', 'href="/about/index.html"')
            html = html.replace('href="/contact.html"', 'href="/contact/index.html"')
            html = html.replace('href="/platform.html"', 'href="/platform/index.html"')
            html = html.replace('href="/solutions.html"', 'href="/solutions/index.html"')
            html = html.replace('href="/pricing.html"', 'href="/pricing/index.html"')
            html = html.replace('href="/faqs.html"', 'href="/faqs/index.html"')
            html = html.replace('href="/accessibility.html"', 'href="/accessibility/index.html"')
            html = html.replace('href="/privacy.html"', 'href="/privacy/index.html"')
            html = html.replace('href="/terms.html"', 'href="/terms/index.html"')
            html = html.replace('href="/made-with-ssg.html"', 'href="/made-with-ssg/index.html"')

            html = html.replace('<img src="" alt="Banking On Quantum Logo"', '<img src="https://cloudcdn.pro/bankingonquantum/v1/logos/bankingonquantum.svg" alt="Banking On Quantum Logo"')
            # Strip any legacy bleeding markdown/class artifacts
            html = html.replace('.class=\\"m-10 w-100\\"', '')
            html = html.replace('.class="m-10 w-100"', '')
            
            # Robust CSP
            html = re.sub(r'<meta\s+http-equiv="Content-Security-Policy"[^>]*>', csp_meta, html)

            # Direct Unescape for interactive HTML components
            html = html.replace('&lt;details', '<details')
            html = html.replace('&lt;/details&gt;', '</details>')
            html = html.replace('&lt;summary', '<summary')
            html = html.replace('&lt;/summary&gt;', '</summary>')
            html = html.replace('&lt;svg', '<svg')
            html = html.replace('&lt;/svg&gt;', '</svg>')
            html = html.replace('&lt;polyline', '<polyline')
            html = html.replace('&lt;/polyline&gt;', '</polyline>')
            html = html.replace('&lt;path', '<path')
            html = html.replace('&lt;/path&gt;', '</path>')
            html = html.replace('&lt;circle', '<circle')
            html = html.replace('&lt;/circle&gt;', '</circle>')
            html = html.replace('&lt;line', '<line')
            html = html.replace('&lt;/line&gt;', '</line>')
            html = html.replace('&lt;rect', '<rect')
            html = html.replace('&lt;/rect&gt;', '</rect>')
            html = html.replace('&lt;span', '<span')
            html = html.replace('&lt;/span&gt;', '</span>')
            html = html.replace('&lt;div', '<div')
            html = html.replace('&lt;/div&gt;', '</div>')
            html = html.replace('&lt;button', '<button')
            html = html.replace('&lt;/button&gt;', '</button>')
            html = html.replace('&lt;h1', '<h1')
            html = html.replace('&lt;/h1&gt;', '</h1>')
            html = html.replace('&lt;p', '<p')
            html = html.replace('&lt;/p&gt;', '</p>')
            html = html.replace('&quot;&gt;', '">')
            html = html.replace('&quot;', '"')
            html = html.replace('&#x27;', "'")
            html = html.replace('&#39;', "'")

            with open(fpath, "w", encoding="utf-8") as f:
                f.write(html)

# 3. Sync static assets (favicon, images, islands, css)
for target in ["public", "docs"]:
    for asset in ["favicon.ico", "images", "islands", "styles.css"]:
        src_path = os.path.join(repo_dir, asset)
        dst_path = os.path.join(repo_dir, target, asset)
        if os.path.isfile(src_path):
            shutil.copyfile(src_path, dst_path)
        elif os.path.isdir(src_path):
            shutil.copytree(src_path, dst_path, dirs_exist_ok=True)

# 4. Write CNAME
cname_domain = "bankingonquantum.com"
for target in ["public", "docs"]:
    with open(os.path.join(repo_dir, target, "CNAME"), "w", encoding="utf-8") as f:
        f.write(cname_domain + "\n")
with open(os.path.join(repo_dir, "CNAME"), "w", encoding="utf-8") as f:
    f.write(cname_domain + "\n")

print("Post-build optimization completed for bankingonquantum.github.io.")
