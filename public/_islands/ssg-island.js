/**
 * SSG Island — lazy-hydrating Web Component loader.
 * Each <ssg-island> loads its component bundle on demand.
 *
 * Hydration strategies: visible | idle | interaction (default visible)
 * Lifecycle:
 *   connectedCallback → arm strategy
 *   detach() / disconnectedCallback / ssg:detach → tear down
 */
class SsgIsland extends HTMLElement {
  constructor() {
    super();
    this._cleanup = [];
    this._hydrated = false;
    this.addEventListener('ssg:detach', () => this.detach());
  }

  connectedCallback() {
    const strategy = this.getAttribute('hydrate') || 'visible';
    const component = this.getAttribute('component');
    if (!component) return;

    const load = () => this._hydrate(component);

    if (strategy === 'idle') {
      let handle;
      if ('requestIdleCallback' in window) {
        handle = requestIdleCallback(load);
        this._cleanup.push(() => {
          if ('cancelIdleCallback' in window) cancelIdleCallback(handle);
        });
      } else {
        handle = setTimeout(load, 200);
        this._cleanup.push(() => clearTimeout(handle));
      }
    } else if (strategy === 'interaction') {
      const events = ['click', 'focusin', 'pointerover'];
      const once = () => {
        events.forEach(e => this.removeEventListener(e, once));
        load();
      };
      events.forEach(e => this.addEventListener(e, once, { once: true }));
      this._cleanup.push(() => {
        events.forEach(e => this.removeEventListener(e, once));
      });
    } else {
      // Default: visible (IntersectionObserver, AC4)
      const io = new IntersectionObserver((entries, obs) => {
        if (entries[0] && entries[0].isIntersecting) {
          obs.disconnect();
          load();
        }
      });
      io.observe(this);
      this._cleanup.push(() => io.disconnect());
    }
  }

  disconnectedCallback() {
    this.detach();
  }

  /**
   * Tear down any pending hydration triggers and notify the loaded
   * component (if it exposed `detach`). Idempotent and safe to call
   * multiple times — used by the view-transitions client (#547) to
   * clean up before swapping <main>.
   */
  detach() {
    while (this._cleanup.length) {
      const fn = this._cleanup.pop();
      try { fn(); } catch (e) {}
    }
    if (this._module && typeof this._module.detach === 'function') {
      try { this._module.detach(this); } catch (e) {}
    }
    this._module = null;
  }

  async _hydrate(component) {
    if (this._hydrated) return;
    this._hydrated = true;
    try {
      const props = JSON.parse(this.getAttribute('props') || '{}');
      const mod = await import(new URL(`./${component}.js`, import.meta.url).href);
      this._module = mod;
      if (mod.default) mod.default(this, props);
      else if (mod.hydrate) mod.hydrate(this, props);
    } catch (e) {
      console.error(`[ssg-island] Failed to hydrate "${component}":`, e);
    }
  }
}

customElements.define('ssg-island', SsgIsland);

// Re-arm islands on view-transition page swaps (issue #547).
// The transitions client dispatches `ssg:after-swap` after each
// successful navigation; the new <main> is fresh DOM, so the
// browser's own connectedCallback fires automatically. We only
// need to re-confirm any island whose connectedCallback may have
// raced with the swap.
document.addEventListener('ssg:after-swap', () => {
  document.querySelectorAll('ssg-island').forEach(el => {
    if (el.isConnected && !el._hydrated && el._cleanup.length === 0) {
      try { el.connectedCallback(); } catch (e) {}
    }
  });
});
