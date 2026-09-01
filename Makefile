# SPDX-License-Identifier: Apache-2.0 OR MIT
# Semantic Version: v0.0.1
.PHONY: all build audit test contrast validate compress prune clean help

all: build

help:
	@echo "Available Makefile targets:"
	@echo "  make build      - Compile static site using Rust static-site-generator"
	@echo "  make audit      - Run WCAG 2.2 AAA (Pa11y) and Lighthouse audits"
	@echo "  make contrast   - Verify color tokens against WCAG 2.2 AAA math ratios"
	@echo "  make validate   - Validate Markdown frontmatter schema integrity"
	@echo "  make compress   - Pre-compress static output with Brotli, Zstd & Gzip"
	@echo "  make prune      - Deterministically delete merged local/remote branches"
	@echo "  make clean      - Remove build artifacts and temporary files"

build:
	@rm -rf public docs/tags
	@if [ -x "/Users/seb/Code/Public/Rust/static-site-generator/target/release/ssg" ]; then \
		/Users/seb/Code/Public/Rust/static-site-generator/target/release/ssg build --content _posts --template _layouts --output public; \
	elif command -v ssg >/dev/null 2>&1; then \
		ssg build --content _posts --template _layouts --output public; \
	elif [ -x "$$HOME/.cargo/bin/ssg" ]; then \
		"$$HOME/.cargo/bin/ssg" build --content _posts --template _layouts --output public; \
	elif [ -f build.sh ]; then \
		bash build.sh; \
	fi
	@cp -R public/* docs/ 2>/dev/null || true
	@/usr/bin/python3 scripts/post-build.py

audit: contrast validate
	@if pa11y-ci --version >/dev/null 2>&1; then \
		pa11y-ci --config .pa11yci; \
	fi
	@/usr/bin/python3 scripts/regression-test.py

contrast:
	@/usr/bin/python3 scripts/audit-contrast.py

validate:
	@/usr/bin/python3 scripts/validate-frontmatter.py

compress:
	@bash scripts/compress-assets.sh public

prune:
	@bash scripts/prune-branches.sh origin

clean:
	@rm -rf public dist .cache coverage *.log
	@echo "Workspace cleaned."
