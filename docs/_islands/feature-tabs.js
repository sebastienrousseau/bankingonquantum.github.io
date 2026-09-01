/*!
 * Kinetic island: platform-surface tabs.
 *
 * Progressive enhancement, not replacement. The panels this enhances are
 * already complete in the HTML — four sections, each with its own heading,
 * stacked in reading order. That is what a visitor without JavaScript sees,
 * what a crawler indexes, and what prints. This module only adds the tab
 * strip that shows one at a time, so there is never a dead control on the
 * page: if the module fails to load, no tab was ever rendered.
 *
 * The markup deliberately carries no `role="tab"` attributes. ARIA tab
 * semantics promise keyboard behaviour — arrow-key roving focus — that only
 * this script can deliver. Announcing the promise in static HTML and then
 * failing to keep it is worse than the plain stack of sections.
 *
 * Hydration is driven by `<ssg-island hydrate="visible">`, so nothing here
 * runs until the section scrolls into view.
 */

/**
 * @param {HTMLElement} root  the <ssg-island> element
 * @param {{label?: string}} props
 */
export default function hydrate(root, props) {
  const wrap = root.querySelector('[data-tabs]');
  if (!wrap) return;

  const panels = Array.from(wrap.querySelectorAll('[data-tab-title]'));
  // One panel is a heading, not a tab strip.
  if (panels.length < 2) return;

  const label = (props && props.label) || 'Sections';
  let index = 0;

  const list = document.createElement('div');
  list.className = 'tabs-nav';
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-label', label);

  const tabs = panels.map((panel, i) => {
    const title = panel.getAttribute('data-tab-title') || `Section ${i + 1}`;
    if (!panel.id) panel.id = `kinetic-panel-${i}`;

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'tab-btn';
    tab.id = `${panel.id}-tab`;
    tab.textContent = title;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);

    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    // A panel is a focus stop so a keyboard user can reach its content
    // directly after choosing a tab.
    panel.setAttribute('tabindex', '0');

    tab.addEventListener('click', () => select(i));
    list.appendChild(tab);
    return tab;
  });

  /* Roving tabindex: one tab in the tab order, arrows move between them.
     This is the behaviour `role="tab"` leads a screen-reader user to
     expect, and the reason the roles are added here and not in the HTML. */
  list.addEventListener('keydown', (event) => {
    const last = tabs.length - 1;
    let next = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = index === last ? 0 : index + 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = index === 0 ? last : index - 1;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = last;
    }

    if (next !== null) {
      event.preventDefault();
      select(next);
      tabs[next].focus();
    }
  });

  function select(to) {
    index = to;
    tabs.forEach((tab, i) => {
      const on = i === to;
      tab.setAttribute('aria-selected', String(on));
      tab.setAttribute('tabindex', on ? '0' : '-1');
      panels[i].hidden = !on;
    });
  }

  wrap.parentNode.insertBefore(list, wrap);
  select(0);
}
